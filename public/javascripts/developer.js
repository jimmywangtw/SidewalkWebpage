$(document).ready(function () {
    var colorMapping = util.misc.getLabelColors();

    function getColor(d) {
        return d > 0.75 ? '#4dac26' :
            d > 0.5 ? '#b8e186' :
                d > 0.25 ? '#f1b6da' :
                    '#d01c8b';
    }

    // Get city-specific parameters for the maps.
    $.getJSON('/cityAPIDemoParams', function(data) {
        L.mapbox.accessToken = data.mapbox_api_key;

        // Create the maps.
        var mapAccessAttributes = L.mapbox.map('developer-access-attribute-map', null, {
            maxZoom: 19,
            minZoom: 9,
            zoomSnap: 0.25
        }).addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11'));
        var mapAccessScoreStreets = L.mapbox.map('developer-access-score-streets-map', null, {
            maxZoom: 19,
            minZoom: 9,
            zoomSnap: 0.25
        }).addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11'));
        var mapAccessScoreNeighborhoods = L.mapbox.map('developer-access-score-neighborhoods-map', null, {
            maxZoom: 19,
            minZoom: 9
        }).addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11'));

        // Use parameters to fill in example URLs.
        var fullBBox = `lat1=${data.southwest_boundary.lat}&lng1=${data.southwest_boundary.lng}&lat2=${data.northeast_boundary.lat}&lng2=${data.northeast_boundary.lng}`;
        var attributesURL = `/v2/access/attributes?lat1=${data.attribute.lat1}&lng1=${data.attribute.lng1}&lat2=${data.attribute.lat2}&lng2=${data.attribute.lng2}`;
        var attributesURLCSV = `/v2/access/attributes?lat1=${data.attribute.lat1}&lng1=${data.attribute.lng1}&lat2=${data.attribute.lat2}&lng2=${data.attribute.lng2}&filetype=csv`;
        var attributesURLShapeFile = `/v2/access/attributes?lat1=${data.attribute.lat1}&lng1=${data.attribute.lng1}&lat2=${data.attribute.lat2}&lng2=${data.attribute.lng2}&filetype=shapefile`;
        var attributeWithLabelsURL = `/v2/access/attributesWithLabels?lat1=${data.attribute.lat1}&lng1=${data.attribute.lng1}&lat2=${data.attribute.lat2}&lng2=${data.attribute.lng2}&severity=3`;
        var streetsURL = `/v2/access/score/streets?lat1=${data.street.lat1}&lng1=${data.street.lng1}&lat2=${data.street.lat2}&lng2=${data.street.lng2}`;
        var streetsURLCSV = `/v2/access/score/streets?lat1=${data.street.lat1}&lng1=${data.street.lng1}&lat2=${data.street.lat2}&lng2=${data.street.lng2}&filetype=csv`;
        var streetsURLShapeFile = `/v2/access/score/streets?lat1=${data.street.lat1}&lng1=${data.street.lng1}&lat2=${data.street.lat2}&lng2=${data.street.lng2}&filetype=shapefile`;
        var regionsURL = `/v2/access/score/neighborhoods?lat1=${data.region.lat1}&lng1=${data.region.lng1}&lat2=${data.region.lat2}&lng2=${data.region.lng2}`;
        var regionsURLCSV = `/v2/access/score/neighborhoods?lat1=${data.region.lat1}&lng1=${data.region.lng1}&lat2=${data.region.lat2}&lng2=${data.region.lng2}&filetype=csv`;
        var regionsURLShapeFile = `/v2/access/score/neighborhoods?lat1=${data.region.lat1}&lng1=${data.region.lng1}&lat2=${data.region.lat2}&lng2=${data.region.lng2}&filetype=shapefile`;

        // Fill in example URLs in HTML.
        $('.api-full-bbox').html(fullBBox);
        $('#attributes-link').attr('href', attributesURL);
        $('#attributes-code').html(attributesURL);
        $('#attributes-with-labels-link').attr('href', attributeWithLabelsURL);
        $('#attributes-with-labels-code').html(attributeWithLabelsURL);
        $('#attributes-link-CSV').attr('href', attributesURLCSV);
        $('#attributes-code-CSV').html(attributesURLCSV);
        $('#attributes-link-shapefile').attr('href', attributesURLShapeFile);
        $('#attributes-code-shapefile').html(attributesURLShapeFile);
        $('#streets-link').attr('href', streetsURL);
        $('#streets-code').html(streetsURL);
        $('#streets-link-CSV').attr('href', streetsURLCSV);
        $('#streets-code-CSV').html(streetsURLCSV);
        $('#streets-link-shapefile').attr('href', streetsURLShapeFile);
        $('#streets-code-shapefile').html(streetsURLShapeFile);
        $('#regions-link').attr('href', regionsURL);
        $('#regions-code').html(regionsURL);
        $('#regions-link-CSV').attr('href', regionsURLCSV);
        $('#regions-code-CSV').html(regionsURLCSV);
        $('#regions-link-shapefile').attr('href', regionsURLShapeFile);
        $('#regions-code-shapefile').html(regionsURLShapeFile);

        // Set view center and max bounds for each map.
        mapAccessAttributes.setView([data.attribute.center_lat, data.attribute.center_lng], data.attribute.zoom);
        mapAccessScoreStreets.setView([data.street.center_lat, data.street.center_lng], data.street.zoom);
        mapAccessScoreNeighborhoods.setView([data.region.center_lat, data.region.center_lng], data.region.zoom);

        var southWest = L.latLng(data.southwest_boundary.lat, data.southwest_boundary.lng);
        var northEast = L.latLng(data.northeast_boundary.lat, data.northeast_boundary.lng);
        mapAccessAttributes.setMaxBounds(L.latLngBounds(southWest, northEast));
        mapAccessScoreStreets.setMaxBounds(L.latLngBounds(southWest, northEast));
        mapAccessScoreNeighborhoods.setMaxBounds(L.latLngBounds(southWest, northEast));

        // Get data for map for Access Attribute.
        $.getJSON(attributesURL, function (data) {
            function style(feature) {
                return {
                    weight: 1,
                    opacity:0.7,
                    color: "#fff"
                }
            }

            L.geoJson(data, {
                style: style,
                pointToLayer: function (feature, latlng) {
                    var labelType = feature.properties.label_type,
                        fillColor = labelType in colorMapping ? colorMapping[labelType].fillStyle : "#ccc";
                    return L.circleMarker(latlng, {
                        radius: 5,
                        fillColor: fillColor,
                        color: "#fff",
                        weight: 1,
                        opacity: 1,
                        fillOpacity: 0.75
                    });
                }
            }).addTo(mapAccessAttributes);
        });

        // Get data for map for Access Score: Streets.
        $.getJSON(streetsURL, function (data) {
            function style(feature) {
                return {
                    weight: 5,
                    opacity:0.7,
                    color: feature.properties.audit_count ? getColor(feature.properties.score) : 'gray',
                    dashArray: '1'
                }
            }

            L.geoJson(data, { style: style }).addTo(mapAccessScoreStreets);
        });

        // Get data for map for Access Score: Neighborhoods.
        // Reference: http://leafletjs.com/examples/choropleth.html
        $.getJSON(regionsURL, function (data) {
            function style(feature) {
                return {
                    fillColor: getColor(feature.properties.score),
                    weight: 3,
                    opacity: 1,
                    color: 'white',
                    dashArray: '3',
                    fillOpacity: 0.7
                }
            }

            L.geoJson(data, {
                style: style
            }).addTo(mapAccessScoreNeighborhoods);
        });
    });
});
