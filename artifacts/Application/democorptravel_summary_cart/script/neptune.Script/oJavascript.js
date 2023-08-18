// sap.ui.getCore().attachInit(function(data) {
//     apioRestAPIExchangeRates();
// });

function callValuesTotalsAndCalculateTripValue() {
  setTimeout(function(){ 
    getValuesAndTotals();
  }, 1000);
}


// function getExchangeRate(detectedCurrency) {

    
    
// }

function calculateTripValue(){
    //console.log("calculateTripValue FUNCTION")
    oButtonBookNow.setEnabled(false);
    
    var totalTripCostings = 0

    //Get exchange rates from model
    var exchangeRateModel = modeloMultiModelExchangeRates.oData;
    //console.log(exchangeRateModel);
    
    
    //----- FLIGHTS -----
    var flightModel = modeloListFlightsSelected.oData;
    //console.log(flightModel);
    for (i = 0; i < flightModel.length; i++) {
        //console.log("i",i);
        var detectedCurrency = flightModel[i].currency;
        //console.log("FLIGHT",detectedCurrency);
        if(detectedCurrency === "EUR") {
            totalTripCostings = totalTripCostings + parseFloat(flightModel[i].totalprice);
            //console.log("Flight total",totalTripCostings);
        }
        else{
            var selectedExchangeRate = exchangeRateModel.rates[detectedCurrency];
            totalTripCostings = totalTripCostings + (parseFloat(flightModel[i].totalprice) / selectedExchangeRate);
        }
    }

    //----- HOTEL -----
    var hotelModel = modeloListHotelsSelected.oData;
    console.log(hotelModel)
    for (i = 0; i < hotelModel.length; i++) {
        var detectedCurrency = hotelModel[i].currency;
        console.log("HOTEL",detectedCurrency)
        if(detectedCurrency === "EUR") {
            totalTripCostings = totalTripCostings + parseFloat(hotelModel[i].totalprice);
        }
        else{
            var selectedExchangeRate = exchangeRateModel.rates[detectedCurrency];
            totalTripCostings = totalTripCostings + (hotelModel[i].totalprice / selectedExchangeRate);
        }
    }
    
    //----- CAR -----
    var carModel = modeloListCarsSelected.oData;
    console.log(carModel)
    for (i = 0; i < carModel.length; i++) {
        var detectedCurrency = carModel[i].rateCurrency;
        console.log("CAR",detectedCurrency)
        if(detectedCurrency === "EUR") {
            totalTripCostings = totalTripCostings + parseFloat(carModel[i].totalReservation);
        }
        else{
            var selectedExchangeRate = exchangeRateModel.rates[detectedCurrency];
            totalTripCostings = totalTripCostings + (carModel[i].totalReservation / selectedExchangeRate);
        }
    }

    
    totalTripCostings = Math.round((totalTripCostings + Number.EPSILON) * 100) / 100
    
    console.log("totalTripCostings = ",totalTripCostings);
    TotalTripPrice.setText("€ "+totalTripCostings);
    
    if (totalTripCostings > 0) {
        oButtonBookNow.setEnabled(true);
    }

    //console.log("Refreshing HotelsSelected Cache...");
    getCacheoListHotelsSelected();
    var data1 = modeloListHotelsSelected.getData();
    modeloListHotels.setData(data1);
    //console.log("modeloListHotels: ", modeloListHotels);
    
    //console.log("Refreshing CarsSelected Cache...");
    getCacheoListCarsSelected();
    var data2 = modeloListCarsSelected.getData();
    modeloListVehicleResults.setData(data2);
    //console.log("modeloListCarsSelected: ", modeloListCarsSelected);
    
    //console.log("Refreshing FlightsSelected Cache...");
    getCacheoListFlightsSelected();
    var data3 = modeloListFlightsSelected.getData();
    modeloListFlights.setData(data3);
    
    oApp.setBusy(false);
    // Use MessageToast
}

function getValuesAndTotals(){

    
    //add names and count to Panel headers
    var qtyHotels = (typeof modeloListHotelsSelected.getData().length === "undefined")?"0": modeloListHotelsSelected.getData().length;
    var qtyCars = (typeof modeloListCarsSelected.getData().length === "undefined")?"0": modeloListCarsSelected.getData().length;
    var qtyFlights = (typeof modeloListFlightsSelected.getData().length === "undefined")?"0": modeloListFlightsSelected.getData().length;
    oPanelFlights.setHeaderText(oTextFlights.getText() + " (" + qtyFlights + ")");
    oPanelHotels.setHeaderText(oTextHotels.getText() + " (" + qtyHotels + ")");
    oPanelCars.setHeaderText(oTextCars.getText() + " (" + qtyCars + ")");
    
    (qtyCars === 0)? oPanelCars.setExpanded(false): oPanelCars.setExpanded(true);
    (qtyHotels === 0)? oPanelHotels.setExpanded(false): oPanelHotels.setExpanded(true);
    (qtyFlights === 0)? oPanelFlights.setExpanded(false): oPanelFlights.setExpanded(true);
    
    calculateTripValue(); 

}


function resize(x) {
    if (x.matches) { // If media query matches
        oImageVehicleRateSummary.setWidth((window.innerWidth - 20) + "px");
    }
    else {
        oImageVehicleRateSummary.setWidth("25rem");
    }
    
}
var x = window.matchMedia("(max-width: 580px)");
resize(x); // Call listener function at run time
x.addListener(resize); // Attach listener function on state changes