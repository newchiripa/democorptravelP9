function getAmadeusToken() {
    var configData = modeloMultiModelConfigData.getData();
    var clientID = configData.find(({name}) => name === "AmadeusClientId");
    var clientSecret = configData.find(({name}) => name === "AmadeusClientSecret");
    var settings = {
        "url": "/proxy/" + encodeURIComponent("https://test.api.amadeus.com/v1/security/oauth2/token"),
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        "data": {
            "grant_type": "client_credentials",
            "client_id": clientID.value,
            "client_secret": clientSecret.value
        }
    };

    $.ajax(settings).done(function(response) {
        //console.log(response);
        AmadeusToken = response.access_token;
    });
}




function resize(x) {
    var itemsFlex = document.querySelectorAll('[id*="oFlexBoxItem"]');
    var itemsPrice = document.querySelectorAll('[id*="oVBoxPrices"]');
    var direction = "";

    for (i = 0; i < itemsFlex.length; i++) {
        if (x.matches) { // If media query matches
            itemsFlex[i].style.flexDirection = "column";
        } else {
            itemsFlex[i].style.flexDirection = "row";
        }
    }

    // for (i = 0; i < itemsPrice.length; i++) {
    //     if (x.matches) { // If media query matches
    //         itemsPrice[i].style.flexDirection = "row";
    //     } else {
    //         itemsPrice[i].style.flexDirection = "column";
    //     }
    // }

}
var x = window.matchMedia("(max-width: 580px)");
resize(x); // Call listener function at run time
x.addListener(resize); // Attach listener function on state changes







function getDate(today) {
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }

    if (mm < 10) {
        mm = '0' + mm;
    }

    today = yyyy + '-' + mm + '-' + dd;
    return today;
}

function minutesToDhms(minutes) {
    minutes = Number(minutes);
    var d = Math.floor(minutes / (60 * 24));
    var h = Math.floor(minutes / 60);
    var m = Math.floor(minutes % 60);

    //if you want to use full String for Hours, Minutes, etc... uncomment this 
    // var dDisplay = d > 0 ? d + " " + (d == 1 ? oTextDay.getText() + ", " : oTextDays.getText() + ", ") : "";
    // var hDisplay = h > 0 ? h + " " + (h == 1 ? oTextHour.getText() + ", " : oTextHours.getText() + ", ") : "";
    // var mDisplay = m > 0 ? m + " " + (m == 1 ? oTextMinute.getText() : oTextMinutes.getText()) : "";

    //if you want to use abreviated String for Hours, Minutes, etc... uncomment this 
    var dDisplay = d > 0 ? d + " " + oTextDay.getText() + ", " : "";
    var hDisplay = h > 0 ? h + " " + oTextHours.getText() + ", " : "";
    var mDisplay = m > 0 ? m + " " + oTextMinutes.getText() : "";
    return dDisplay + hDisplay + mDisplay;
}

function getTimeFormatted(dat) {
    var date = new Date(dat);
    var hh = date.getHours();
    var mm = date.getMinutes();

    if (hh < 10) {
        hh = '0' + hh;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    return hh + ":" + mm;
}

function howManyDaysText(dep, arr) {
    var depDate = new Date(dep);
    depDate.setHours(0, 0, 0, 0);
    depDate = depDate.getTime();
    var arrDate = new Date(arr);
    arrDate.setHours(0, 0, 0, 0);
    arrDate = arrDate.getTime();

    var days = Math.floor((arrDate - depDate) / (1000 * 3600 * 24));

    var result;
    switch (days) {
        case 0:
            result = oTextSameDay.getText();
            break;

        case 1:
            result = oTextNextDay.getText();
            break;

        default:
            result = days + " " + oTextXDaysAfter.getText();
            break;
    }
    return result;
}

function howManyDays(dep, arr) {
    var depDate = new Date(dep);
    depDate.setHours(0, 0, 0, 0);
    depDate = depDate.getTime();
    var arrDate = new Date(arr);
    arrDate.setHours(0, 0, 0, 0);
    arrDate = arrDate.getTime();

    var days = Math.floor((arrDate - depDate) / (1000 * 3600 * 24));
    return days;
}

function createBookingID(){
    var id = "";
    var data;
    while (typeof data === "undefined"){
        id = Math.random().toString(20).substr(2, 20);
        data = ModelData.Find(oListFlightsSelected, "id", id, "EQ");
    }
    return id;
}

sap.ui.getCore().attachInit(function(data) {
    OpenoMsgInfo();
});