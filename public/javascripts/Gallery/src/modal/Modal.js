/**
 * A Modal element that provides extended information about a label,
 * along with placing a label in a GSV Panorama to aid the user in 
 * contextualizing the location of labels.
 * 
 * @param {HTMLElement} uiModal The container for the Modal in the DOM
 * @returns 
 */
function Modal(uiModal) {
    
    let self = this;

    // Properties of the label in the card.
    let properties = {
        label_id: undefined,
        label_type: undefined,
        gsv_panorama_id: undefined,
        heading: undefined,
        pitch: undefined,
        zoom: undefined,
        canvas_x: undefined,
        canvas_y: undefined,
        canvas_width: undefined,
        canvas_height: undefined,
        severity: undefined,
        temporary: undefined,
        description: undefined,
        tags: []
    };

    /**
     * The initialization function for the Modal. It serves to bind the DOM elements of the Modal
     * to class variables, for future access when populating the fields. It also instantiates
     * the GSV panorama in the specified location of the Modal.
     */
    function _init() {
        self.panoHolder = $('.actual-pano')
        self.tags = $('.gallery-modal-info-tags')
        self.severity = $('.gallery-modal-info-severity')
        self.temporary = $('.gallery-modal-info-temporary')
        self.description = $('.gallery-modal-info-description')
        self.header = $('.gallery-modal-header')
        self.pano = new GalleryPanorama(self.panoHolder)
        self.closeButton = $('.gallery-modal-close')
        self.closeButton.click(closeModal)
    }

    /**
     * Performs the actions to close the Modal
     */
    function closeModal() {
        $('.grid-container').css("grid-template-columns", "1fr 3fr")
        uiModal.hide()
    }

    /**
     * Resets the fields of the Modal
     */
    function resetModal() {
        self.description.empty()
        self.temporary.empty()
        self.severity.empty()
    }

    /**
     * Populates the information in the Modal
     */
    function populateModalDescriptionFields() {
        // Adds the severity display to the Modal
        new SeverityDisplay(self.severity, properties.severity, true)
        // Adds the tag display to the Modal
        new TagDisplay(self.tags, properties.tags, true)
        // Adds the information about the temporary property to the Modal
        let temporaryHeader = document.createElement('div')
        temporaryHeader.innerHTML = `<div><b>Temporary</b></div><div>${'' + properties.temporary}</div>`
        self.temporary.append(temporaryHeader)
        // Adds the information about the description of the label to the Modal
        let descriptionText = properties.description === null ? "" : properties.description
        let descriptionObject = document.createElement('div')
        descriptionObject.innerHTML = `<div><b>Description</b></div><div>${descriptionText}</div>`
        self.description.append(descriptionObject)
    }

    /**
     * Performs the actions needed to open the modal
     */
    function openModal() {
        resetModal()
        populateModalDescriptionFields()
        self.pano.setPano(properties.gsv_panorama_id, properties.heading, properties.pitch, properties.zoom)
        self.pano.renderLabel(self.label)
        self.header.text(properties.label_type)    
    }

    /**
     * Updates the local variables to the properties of a new label and creates a 
     * GalleryPanoramaLabel object that uses the new label properties
     * 
     * @param newProps The new properties to push into the Modal
     */
    function updateProperties(newProps) {
        for (let attrName in newProps) {
            properties[attrName] = newProps[attrName]
        }
        self.label = new GalleryPanoramaLabel(properties.label_id, properties.label_type, 
                                                properties.canvas_x, properties.canvas_y, 
                                                properties.canvas_width, properties.canvas_height, 
                                                properties.heading, properties.pitch, properties.zoom)
    }

    _init()

    self.updateProperties = updateProperties;
    self.openModal = openModal;
    return self
}