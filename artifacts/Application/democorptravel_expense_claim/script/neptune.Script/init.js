// Custom Init - Happens only once
sap.ui.getCore().attachInit(function(data) {

    // data = startParameters from NAM Action settings on the tile
    // Do your Stuff

    // Some stuff needs to be timed later. Run them inside a timeout
    setTimeout(function() {
        oButtonSync.firePress();
    }, 200);

});