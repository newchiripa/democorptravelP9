//Global Variables
var AmadeusToken;
var ApiHotelV3Struc = {};
var addr;
var detailStruc;

// Custom Init - Happens only once when mounting the component
sap.ui.getCore().attachInit(function(startParams) {

oApp.setBusy(true);

});

function getAmadeusToken() {
    var configData = modeloMultiModelConfigData.getData();
    var clientID = configData.find(({ name }) => name === "AmadeusClientId");
    var clientSecret = configData.find(({ name }) => name === "AmadeusClientSecret");
    var settings = {
        url:
            "/proxy/" + encodeURIComponent("https://test.api.amadeus.com/v1/security/oauth2/token"),
        method: "POST",
        timeout: 0,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        data: {
            grant_type: "client_credentials",
            client_id: clientID.value,
            client_secret: clientSecret.value,
        },
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
        AmadeusToken = response.access_token;

        oApp.setBusy(false);
    });
}

// Hello!

Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};

function createBookingID() {
    var id = "";
    var data;
    while (typeof data === "undefined") {
        id = Math.random().toString(20).substr(2, 20);
        data = ModelData.Find(oListHotelsSelected, "id", id, "EQ");
    }
    return id;
}

sap.ui.getCore().attachInit(function (data) {
    OpenoMsgInfo();
});

function getAddress(lat, lon) {
    var settings = {
        url:
            "/proxy/" + encodeURIComponent("http://nominatim.openstreetmap.org/reverse"),
        method: "POST",
        timeout: 0,
        headers: {},
        data: {
            format: "json",
            lat: lat,
            lon: lon,            
        },
    };

    $.ajax(settings).done(function (response) {
        console.log("Address Response:")
        console.log(response.display_name);
        // AmadeusToken = response.access_token;
        return response.display_name;
        // oApp.setBusy(false);
    });
}
