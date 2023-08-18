function calculateTripValue(){
    //console.log("calculateTripValue FUNCTION")
    oButtonBookNow.setEnabled(false);
    //CALCULATE HERE THE TOTAL VALUE OF THE TRIP

    //Get exchange rates from model
    var exchangeRateModel = modeloMultiModelExchangeRates.oData;
    var exchangeRateGBP = exchangeRateModel.rates.GBP;
    //console.log("exchangeRateGBP = ",exchangeRateGBP);
    
    var carModel = modeloListCarsSelected.oData;
    var carTotalGBP = 0;
    var carTotalEUR = 0;
    for (i = 0; i < carModel.length; i++) {
        if (carModel[i].rateCurrency === "EUR") {
            carTotalEUR = carTotalEUR + carModel[i].totalReservation;
        }
        else carTotalGBP = carTotalGBP + carModel[i].totalReservation;
        }
    
    var hotelModel = modeloListHotelsSelected.oData;
    var hotelTotalGBP = 0;
    var hotelTotalEUR = 0;
    for (i = 0; i < hotelModel.length; i++) {
        if (hotelModel[i].rateCurrency === "EUR") {
            hotelTotalEUR = hotelTotalEUR + carModel[i].totalReservation;
        }
        
        else hotelTotalGBP = hotelTotalGBP + hotelModel[i].totalprice;
        }
        
    var flightModel = modeloListFlightsSelected.oData;
    console.log(modeloListFlightsSelected.oData);
    var flightTotalGBP = 0;
    var flightTotalEUR = 0;
    for (i = 0; i < flightModel.length; i++) {
        if (flightModel[i].currency === "EUR") {
            flightTotalEUR = flightTotalEUR + flightModel[i].totalReservation;
        }
        
        else flightTotalGBP = flightTotalGBP + Number(flightModel[i].totalprice);
        }
    
     console.log("flightTotalGBP = ",flightTotalGBP);
     console.log("flightTotalEUR = ",flightTotalEUR);
     console.log("hotelTotalGBP = ",hotelTotalGBP);
     console.log("hotelTotalEUR = ",hotelTotalEUR);
     console.log("carTotalGBP = ",carTotalGBP);
     console.log("carTotalEUR = ",carTotalEUR);
    
    var totalTripPriceGPB = flightTotalGBP+hotelTotalGBP+carTotalGBP;
    var totalTripPriceEUR = flightTotalEUR+hotelTotalEUR+carTotalEUR;
    console.log("totalTripPriceGPB = ",totalTripPriceGPB);
    console.log("totalTripPriceEUR = ",totalTripPriceEUR);
    
    var exchangedGBPtoEUR = totalTripPriceGPB / exchangeRateGBP
    console.log("exchangedGBPtoEUR = ",exchangedGBPtoEUR);

    var totalTripCostings = totalTripPriceEUR + exchangedGBPtoEUR
    totalTripCostings = Math.round((totalTripCostings + Number.EPSILON) * 100) / 100
    
    console.log("totalTripCostings = ",totalTripCostings);
    TotalTripPrice.setText("€ "+totalTripCostings);
    
    if (totalTripCostings > 0) {
        oButtonBookNow.setEnabled(true);
    }
    
    
    // -----
    
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
    
    // -----
    
    
    
    
    
    oApp.setBusy(false);
    // Use MessageToast
}