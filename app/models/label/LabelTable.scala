package models.label

import java.util.UUID

import com.vividsolutions.jts.geom.LineString
import models.audit.{AuditTask, AuditTaskTable}
import models.utils.MyPostgresDriver.simple._
import play.api.Play.current

import scala.slick.jdbc.{GetResult, StaticQuery => Q}
import scala.slick.lifted.ForeignKeyQuery

case class Label(labelId: Int, auditTaskId: Int, gsvPanoramaId: String, labelTypeId: Int, photographerHeading: Float, photographerPitch: Float, panoramaLat: Float, panoramaLng: Float, deleted: Boolean, temporaryLabelId: Option[Int])
case class LabelLocation(labelId: Int, auditTaskId: Int, gsvPanoramaId: String, labelType: String, lat: Float, lng: Float)
/**
 *
 */
class LabelTable(tag: Tag) extends Table[Label](tag, Some("sidewalk"), "label") {
  def labelId = column[Int]("label_id", O.PrimaryKey, O.AutoInc)
  def auditTaskId = column[Int]("audit_task_id", O.NotNull)
  def gsvPanoramaId = column[String]("gsv_panorama_id", O.NotNull)
  def labelTypeId = column[Int]("label_type_id", O.NotNull)
  def photographerHeading = column[Float]("photographer_heading", O.NotNull)
  def photographerPitch = column[Float]("photographer_pitch", O.NotNull)
  def panoramaLat = column[Float]("panorama_lat", O.NotNull)
  def panoramaLng = column[Float]("panorama_lng", O.NotNull)
  def deleted = column[Boolean]("deleted", O.NotNull)
  def temporaryLabelId = column[Option[Int]]("temporary_label_id", O.Nullable)

  def * = (labelId, auditTaskId, gsvPanoramaId, labelTypeId, photographerHeading, photographerPitch,
    panoramaLat, panoramaLng, deleted, temporaryLabelId) <> ((Label.apply _).tupled, Label.unapply)

  def auditTask: ForeignKeyQuery[AuditTaskTable, AuditTask] =
    foreignKey("label_audit_task_id_fkey", auditTaskId, TableQuery[AuditTaskTable])(_.auditTaskId)

  def labelType: ForeignKeyQuery[LabelTypeTable, LabelType] =
    foreignKey("label_label_type_id_fkey", labelTypeId, TableQuery[LabelTypeTable])(_.labelTypeId)
}

/**
 * Data access object for the label table
 */
object LabelTable {
  val db = play.api.db.slick.DB
  val labels = TableQuery[LabelTable]
  val auditTasks = TableQuery[AuditTaskTable]
  val labelTypes = TableQuery[LabelTypeTable]
  val labelPoints = TableQuery[LabelPointTable]

  case class LabelCountPerDay(date: String, count: Int)

  implicit val labelLocationConverter = GetResult[LabelLocation](r =>
    LabelLocation(r.nextInt, r.nextInt, r.nextString, r.nextString, r.nextFloat, r.nextFloat)
  )

  def countLabels: Int = db.withTransaction( implicit session =>
    labels.filter(_.deleted === false).list.size
  )

  /**
    * This method returns the number of labels submitted by the given user
    *
    * @param userId User id
    * @return A number of labels submitted by the user
    */
  def countLabelsByUserId(userId: UUID): Int = db.withSession { implicit session =>
    val tasks = auditTasks.filter(_.userId === userId.toString)
    val labelsWithoutDeleted = labels.filter(_.deleted === false)

    val _labels = for {
      (_tasks, _labels) <- tasks.innerJoin(labelsWithoutDeleted).on(_.auditTaskId === _.auditTaskId)
    } yield _labels
    _labels.list.size
  }

  /**
   * Saves a new labe in the table
    *
    * @param label
   * @return
   */
  def save(label: Label): Int = db.withTransaction { implicit session =>
    val labelId: Int =
      (labels returning labels.map(_.labelId)) += label
    labelId
  }

  /**
    * This method returns all the submitted labels
    *
    * @return
    */
  def selectLocationsOfLabels: List[LabelLocation] = db.withSession { implicit session =>
    val labelsWithoutDeleted = labels.filter(_.deleted === false)

    val _labels = for {
      (_labels, _labelTypes) <- labelsWithoutDeleted.innerJoin(labelTypes).on(_.labelTypeId === _.labelTypeId)
    } yield (_labels.labelId, _labels.auditTaskId, _labels.gsvPanoramaId, _labelTypes.labelType, _labels.panoramaLat, _labels.panoramaLng)

    val _points = for {
      (l, p) <- _labels.innerJoin(labelPoints).on(_._1 === _.labelId)
    } yield (l._1, l._2, l._3, l._4, p.lat.getOrElse(0.toFloat), p.lng.getOrElse(0.toFloat))

    val labelLocationList: List[LabelLocation] = _points.list.map(label => LabelLocation(label._1, label._2, label._3, label._4, label._5, label._6))
    labelLocationList
  }

  /**
    * Retrieve Label Locations within a given bounding box
    * @param minLat
    * @param minLng
    * @param maxLat
    * @param maxLng
    * @return
    */
  def selectLocationsOfLabelsIn(minLat: Double, minLng: Double, maxLat: Double, maxLng: Double): List[LabelLocation] = db.withSession { implicit session =>
    val undeletedLabels = labels.filter(_.deleted === false)

    val selectLabelLocationQuery = Q.query[(Double, Double, Double, Double), LabelLocation](
      """select label.label_id, label.audit_task_id, label.gsv_panorama_id, label_type.label_type, label_point.lat, label_point.lng from sidewalk.label
        |INNER JOIN sidewalk.label_type
        |ON label.label_type_id = label_type.label_type_id
        |INNER JOIN sidewalk.label_point
        |ON label.label_id = label_point.label_id
        |WHERE label.deleted = false
        |AND label_point.lat IS NOT NULL
        |AND ST_Intersects(label_point.geom, ST_MakeEnvelope(?, ?, ?, ?, 4326))""".stripMargin
    )
    selectLabelLocationQuery((minLng, minLat, maxLng, maxLat)).list
  }

  /**
   * This method retunrs a list of labels submitted by the given user.
    *
    * @param userId
   * @return
   */
  def selectLocationsOfLabelsByUserId(userId: UUID): List[LabelLocation] = db.withSession { implicit session =>
    val labelsWithoutDeleted = labels.filter(_.deleted === false)

    val _labels = for {
      ((_auditTasks, _labels), _labelTypes) <- auditTasks leftJoin labelsWithoutDeleted on(_.auditTaskId === _.auditTaskId) leftJoin labelTypes on (_._2.labelTypeId === _.labelTypeId)
      if _auditTasks.userId === userId.toString
    } yield (_labels.labelId, _labels.auditTaskId, _labels.gsvPanoramaId, _labelTypes.labelType, _labels.panoramaLat, _labels.panoramaLng)

    val _points = for {
      (l, p) <- _labels.innerJoin(labelPoints).on(_._1 === _.labelId)
    } yield (l._1, l._2, l._3, l._4, p.lat.getOrElse(0.toFloat), p.lng.getOrElse(0.toFloat))

    val labelLocationList: List[LabelLocation] = _points.list.map(label => LabelLocation(label._1, label._2, label._3, label._4, label._5, label._6))
    labelLocationList
  }

  def selectLabelCountsPerDay: List[LabelCountPerDay] = db.withSession { implicit session =>
    val selectAuditCountQuery =  Q.queryNA[(String, Int)](
      """SELECT calendar_date::date, COUNT(label_id) FROM (SELECT  current_date - (n || ' day')::INTERVAL AS calendar_date
        |FROM    generate_series(0, 30) n) AS calendar
        |LEFT JOIN sidewalk.audit_task
        |ON audit_task.task_start::date = calendar_date::date
        |LEFT JOIN sidewalk.label
        |ON label.audit_task_id = audit_task.audit_task_id
        |GROUP BY calendar_date
        |ORDER BY calendar_date""".stripMargin
    )
    selectAuditCountQuery.list.map(x => LabelCountPerDay.tupled(x))
  }
}
