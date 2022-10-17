function StatusFieldNeighborhood (neighborhoodModel, userModel, uiStatus) {
    var self = this;
    this._neighborhoodModel = neighborhoodModel;
    this._userModel = userModel;

    this._neighborhoodModel.on("NeighborhoodContainer:neighborhoodChanged", function (parameters) {
        var newNeighborhood = parameters.newNeighborhood;
        self.setNeighborhoodName(newNeighborhood.getProperty("name"));

        var user = self._userModel.getUser();
        if (user && user.getProperty("role") !== "Anonymous") {
            var href = "/dashboard" + "?regionId=" + newNeighborhood.getProperty("regionId");
            self.setHref(href);
        }
    });

    this.setAuditedDistance = function (distance) {
        uiStatus.auditedDistance.html(i18next.t('common:format-number', { val: distance.toFixed(2) }));
    };

    this.setLabelCount = function (count) {
        uiStatus.neighborhoodLabelCount.html(i18next.t('common:format-number', { val: count }));
    };

    /**
     * Set the href attribute of the link
     * @param hrefString
     */
    this.setHref = function (hrefString) {
        if (uiStatus.neighborhoodLink) {
            uiStatus.neighborhoodLink.attr("href", hrefString)
        }
    };

    this.setNeighborhoodName = function (name) {
        uiStatus.neighborhoodName.html(name + ", ");
    };
}
