oApp.setBusy(false);

var hotelIDs = modeloMultiModelListHotelsByCity.getData().data;
// var hotelIDs = modeloMultiModelListHotelsByCity.getData().data[0].hotelId;

console.log("API List Hotel By City:");
console.log(hotelIDs);

var hotelIDsArray = [];

hotelIDs.forEach(function (hotelID) {
    // console.log(hotelID.hotelId);
    hotelIDsArray.push(hotelID.hotelId);
});

// hotelIDsArray.push(hotelIDs[3].hotelId);

console.log("Hotel IDs Array:");
console.log(hotelIDsArray);

console.log("ApiHotelV3Struc:");
console.log(ApiHotelV3Struc);

var options = {
    headers: {
        "Authorization": "Bearer " + AmadeusToken, // Optional.
    },
    parameters: {
        "hotelIds": hotelIDsArray, // Required
        // "hotelIds": "LENYC7A3", // Required
        "adults": ApiHotelV3Struc.adults, // Optional
        "checkInDate": ApiHotelV3Struc.checkInDate, // Optional
        "checkOutDate": ApiHotelV3Struc.checkOutDate, // Optional
        "countryOfResidence": "", // Optional
        "roomQuantity": ApiHotelV3Struc.roomQuantity, // Optional
        "priceRange": ApiHotelV3Struc.priceRange, // Optional
        "currency": ApiHotelV3Struc.currency, // Optional
        "paymentPolicy": ApiHotelV3Struc.paymentPolicy, // Optional
        "boardType": "", // Optional
        "includeClosed": ApiHotelV3Struc.includeClosed, // Optional
        "bestRateOnly": ApiHotelV3Struc.bestRateOnly, // Optional
        "lang": "" // Optional
    }
};

apioAPIGetHotelListV3(options);
