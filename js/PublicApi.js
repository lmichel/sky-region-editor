/**
 * Public API to include the region editor in a WEB page
 */

/**
 * Basic sky geometry functions
 */
SkyRegionEditor = function() {
    var regionEditor = null;
    var blueOverlay = null;
    var stcRegion = null;
    
    /**
     * aladin_div: div where aladin is drawn (supposed to be squared)
     * handler: to be called when the polygon is drown
     */
    var init = function(aladin_div){
        if( regionEditor == null ) {
            regionEditor = new RegionEditor_mVc  (aladin_div, handler); 
            regionEditor.init();
        } else {
            alert("Editor already initialized");
        }
    }
    
    /**
     * return the current region editor (used for dev)
     */
    var getEditor = function(aladin_div){
        return regionEditor
    }
    
    /**
     * Draw a new footprint and set the edition mode
     * polygon: String serialization of the image footprint 
                e.g. "213.8925 44.575 213.8925 45.295 214.6125 45.295 214.6125 44.575"
     */
    var setFootprint = function(str_polygon){
      if( regionEditor == null ) {
            alert("Editor not initialized yet");
      } else {
            // Remove the former footprint on case of
            delFootprint();
            // Keep the region model
            stcRegion = new STCRegion(str_polygon)  
            // Init the Aladin view  
            regionEditor.aladin.gotoObject(stcRegion.raCenter + ' ' + stcRegion.decCenter);
            regionEditor.aladin.setZoom(2*stcRegion.size);
            regionEditor.setInitialValue({type: "array", value: stcRegion.coords});
            // Plot the image footprint
            blueOverlay = A.graphicOverlay({color: 'blue', lineWidth: 2});
            regionEditor.aladin.addOverlay(blueOverlay);
            blueOverlay.addFootprints(A.polygon(stcRegion.points));  
            // wait a little bit on Aladin readiness before to run the edition mode
            setTimeout(function(){$("#edit")[0].click()}, 1000);
      }           
    }
    /*
     * return the float array of points [[ra, dec], ...] matching current footprint
     */
    var getFootprint = function(alpha){
        if( stcRegion != null ) {
            return stcRegion.points
        } else {
            alert("No active footprint");
            return "No active footprint";
        }
    }
    /**
     * Delete the current footprint and disable the edition mode
     */
    var delFootprint = function(alpha){
        if( stcRegion != null ) {
            blueOverlay.removeAll()  
            blueOverlay = null;  
            stcRegion = null;  
            $("#clear")[0].click()
            $("#browse")[0].click()
        } else {
            //alert("No active footprint");
        }
    }
    /*
     * public methods
     */
    var pblc = {};
    pblc.init = init;
    pblc.setFootprint = setFootprint;
    pblc.getFootprint = getFootprint;
    pblc.delFootprint = delFootprint;
    pblc.getEditor = getEditor;
    return pblc;
}();