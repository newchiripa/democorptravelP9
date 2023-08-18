function formatSAPDate(SAPDATE){
    var dat = SAPDATE.substring(0,4) + "-" + SAPDATE.substring(4,6) + "-" + SAPDATE.substring(6);
    return moment(dat).format("DD-MM-YYYY"); 
}

function setFieldsReceipt() {
    //  Enabled / Disabled
    var dataEntry = modeloPageTripDetail.getData();
    if (dataEntry.SELECT_APPROVED == true) {
        setEdit(false);
    } else {

        // Check if original is Sent
        if (dataEntry.UPDATE == 'U') {

            var data = ModelData.Find(oListTrips, "REINR", dataEntry.REINR);

            if (data[0].SELECT_APPROVED == false) {
                setEdit(true);
            } else {
                setEdit(false);
            }

        } else {
            setEdit(true);
        }
    }
}




function setEdit(status){
    oButtonDeleteTrip.setEnabled(status);
    oButtonAddExpense.setEnabled(status);
    oButtonSaveTripSubmit.setEnabled(status);
    

    oDatePickerTDDateFrom.setEditable(status);
    oDatePickerTDDateTo.setEditable(status);
    oInputTDLocation.setEditable(status);
    oInputTDReason.setEditable(status);
    oSelectTDCountry.setEnabled(status);
    oSelectTDStatutory.setEnabled(status);
    oSelectTDActivity.setEnabled(status);
    oInputTDIntOrder.setEditable(status);
    
    oDatePickerExpenseDate.setEditable(status);
    oSelectExpenseType.setEnabled(status);
    oInputExpenseAmount.setEditable(status);
    oSelectExpenseCurrency.setEnabled(status);
    oInputExpenseInfo.setEditable(status);
    inReceiptLocation.setEditable(status);
    
    if (status == true) {
        oTableExpenses.setMode("Delete");
    } else {
        oTableExpenses.setMode();
    }
}
// Create Key ID
function genKey(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}