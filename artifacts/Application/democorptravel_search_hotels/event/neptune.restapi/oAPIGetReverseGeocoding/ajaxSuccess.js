// console.log("HotelID:");
// console.log(HotelID);

// console.log("Multimodel Geocoding:");
// console.log(modeloMultiModelReverseGeocoding.oData);

// var apiAddress = modeloMultiModelReverseGeocoding.oData.display_name;
// console.log(apiAddress);
// var data = ModelData.FindFirst(TableHotelAddresses, "hotelid", HotelID, "EQ");

// data.address = apiAddress;

// ModelData.Update(TableHotelAddresses, "hotelid", HotelID, data, "EQ");

// HotelAddressesStruc.address = apiAddress;

// HotelAddressesArray.push(HotelAddressesStruc);

// //Validate if there is another hotel without address
// var check = ModelData.FindFirst(TableHotelAddresses, "address", "", "EQ");
// if (check !== undefined) {
//     console.log("Table Addresses:")
//     console.log(HotelAddressesArray);    
// }

console.log("Detail Struc");
console.log(detailStruc);

var apiAddress = modeloMultiModelReverseGeocoding.oData.display_name;

detailStruc.address = apiAddress;

modeloFormHotelDetails.setData(detailStruc);

oApp.toDetail(oPageDetail);