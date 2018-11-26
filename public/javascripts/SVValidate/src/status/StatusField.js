/**
 * Updates items that appear on the right side of the validation interface (i.e., label counts)
 * @param missionMetadata   Metadata for the initial mission
 * @returns {StatusField}
 * @constructor
 */
function StatusField(missionMetadata) {
    var self = this;

    var labelNames = {
        CurbRamp : "Curb Ramp",
        NoCurbRamp : "Missing Curb Ramp",
        Obstacle : "Obstacle in Path",
        SurfaceProblem : "Surface Problem",
        NoSidewalk : "Missing Sidewalk",
        Other : "Other"
    };

    /**
     * Function to initialize the status field the first time.
     * Sets the mission description to validate the number of labels in the initial mission.
     * @private
     */
    function _init() {
        updateMissionDescription(missionMetadata.labels_validated);
    }

    /**
     * Updates the number of labels the user has validated.
     * @param count {int} Number of labels the user has validated.
     */
    function updateLabelCounts(count) {
        svv.ui.status.labelCount.html(count);
    }

    /**
     * Updates the label name that is displayed in the status field.
     * @param labelType {String} Name of label without spaces.
     */
    function updateLabelText(labelType) {
        var labelName = labelNames[labelType];

        svv.ui.status.labelTypeExample.html(labelName);
        svv.ui.status.labelTypeCounterexample.html("NOT".italics() + " a " + labelName);
    }

    /**
     * Updates the text for the mission description.
     * @param count {int} Number of labels to validate this mission.
     */
    function updateMissionDescription(count) {
        svv.ui.status.missionDescription.html("Validate " + count + " labels");
    }

    // TODO: write resizeTextSize function, if necessary

    _init();

    self.updateLabelCounts = updateLabelCounts;
    self.updateLabelText = updateLabelText;
    self.updateMissionDescription = updateMissionDescription;

    return this;
}