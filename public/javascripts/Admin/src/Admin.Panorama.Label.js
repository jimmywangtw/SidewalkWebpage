/**
 *
 * @param labelId
 * @param labelType
 * @param canvasX
 * @param canvasY
 * @param originalCanvasWidth
 * @param originalCanvasHeight
 * @param heading
 * @param pitch
 * @param zoom
 * @param streetEdgeId
 * @returns {{className: string}}
 * @constructor
 */
function AdminPanoramaLabel(labelId, labelType, canvasX, canvasY, originalCanvasWidth, originalCanvasHeight,
                            heading, pitch, zoom, streetEdgeId) {
    var self = { className: "AdminPanoramaLabel" };

    /**
     * This function initializes the Panorama
     */
    function _init () {
        self.labelId = labelId;
        self.label_type = labelType;
        self.canvasX = canvasX;
        self.canvasY = canvasY;
        self.originalCanvasWidth = originalCanvasWidth;
        self.originalCanvasHeight = originalCanvasHeight;
        self.heading = heading;
        self.pitch = pitch;
        self.zoom = zoom;
        self.streetEdgeId = streetEdgeId;
        return this;
    }

    _init();

    return self;
}