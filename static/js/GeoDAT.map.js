function GD_Map(selector, o){
    var selector = selector;
    // map & layers
    var map = null;
    var baseLayer = null;
    var currLayers = []; 
    var fpLayer = null;
    var newFPLayers = null;
    // styles
    var fpStyle = null;
    var newFPStyle = null;
    // controls
    var navControl = null;
    var modifyControl = null;
    var selectControl = null;
    var drawControl = null;

    var options,
        defaults = {
            'mapClassName': 'mapDiv'
        };

    /** set up the configuration options */
    if (typeof o === 'object') {
        options = $.extend(defaults, o);
    } else {
        options = defaults;
    }
    
    _init();
    
    function _init() {
        map = new OpenLayers.Map(selector);
        map.addControl(new OpenLayers.Control.LayerSwitcher());
    
        var gphy = new OpenLayers.Layer.Google(
            "Google Physical",
            {type: google.maps.MapTypeId.TERRAIN}
        );
        var gmap = new OpenLayers.Layer.Google(
            "Google Streets", // the default
            {numZoomLevels: 20}
        );
        var ghyb = new OpenLayers.Layer.Google(
            "Google Hybrid",
            {type: google.maps.MapTypeId.HYBRID, numZoomLevels: 20}
        );
        var gsat = new OpenLayers.Layer.Google(
            "Google Satellite",
            {type: google.maps.MapTypeId.SATELLITE, numZoomLevels: 22}
        );
        baseLayer = gphy;
        currLayers.push(baseLayer);
        currLayers.push(gmap);
        currLayers.push(ghyb);
        currLayers.push(gsat);
        map.addLayers(currLayers);

        // Google.v3 uses EPSG:900913 as projection, so we have to
        // transform our coordinates
        map.setCenter(new OpenLayers.LonLat(10.2, 48.9).transform(
            new OpenLayers.Projection("EPSG:4326"),
            map.getProjectionObject()
        ), 5);
    
        // Animated zoom (if supported by GMaps on your device)
        for (var i=map.layers.length-1; i>=0; --i) {
            map.layers[i].animationEnabled = this.checked;
        }
    };
    
    function reset() {
          
    };
    
    return {
        reset: reset
    };
}
