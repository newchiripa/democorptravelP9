var fileUrl = "";
var ImagesData = [];
window.getFilefromFileSystem = function(input) {
    
    if (oSwitchOCR.getState()) readOCRTabScanner(input);
    //if (oSwitchOCR.getState()) readOCR(input);
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function(e) {
            //console.log(e.target.result);
            modeloDialogExpense.getData().IMAGE_SOURCE = "";
            oImageReceipt.setSrc(e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
}

function readOCRTabScanner(input){
    var dataForm = new FormData();
    dataForm.append("file", input.files[0], input.files[0].name);

    var url = "/proxy/" + encodeURIComponent("https://api.tabscanner.com/api/2/process");
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.open("POST", url, true);
    // xhr.setRequestHeader("apikey", "vRb5mMfV1x48OUbUvnWcx6do3DbVFJO15r2tTMINhZDmGlXVOdFoMflUYoHdtUOw");
    xhr.setRequestHeader("apikey", "XlKxIt0hLlD3VHlw5BHA4iEV2kPAL49RpF15U3CCIBGci7XdKC7BuQmS1ALlhBUV"); //new key Daniel's account
    xhr.onload = () => {
        
        let status = xhr.status;
        if (status == 200) {
            var response = JSON.parse(xhr.response);
            //did it work?
            if (!response.success) {
                //show message and leave
                oBusyDialogOCR.close();
                jQuery.sap.require("sap.m.MessageBox");
                sap.m.MessageBox.show("Failure reading the receipt. please input the values manually");
                return;
            }
            
            //now retrieve the details of the submitted imageFile
            getTabScannerFileDetails(response.token);
        } else {
            //handle error
            oBusyDialogOCR.close();
            jQuery.sap.require("sap.m.MessageBox");
            sap.m.MessageBox.show("Failure reading the receipt. please input the values manually");
        }

    };
    oBusyDialogOCR.open();
    // oApp.setBusy(true);
    xhr.send(dataForm);
    
}

function getTabScannerFileDetails(token){
    var url = "/proxy/" + encodeURIComponent("https://api.tabscanner.com/api/result/" + token);
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.open("GET", url, true);
    // xhr.setRequestHeader("apikey", "vRb5mMfV1x48OUbUvnWcx6do3DbVFJO15r2tTMINhZDmGlXVOdFoMflUYoHdtUOw");
    xhr.setRequestHeader("apikey", "XlKxIt0hLlD3VHlw5BHA4iEV2kPAL49RpF15U3CCIBGci7XdKC7BuQmS1ALlhBUV"); //new key Daniel's account
    xhr.onload = () => {
        oBusyDialogOCR.close();
        let status = xhr.status;
        if (status == 200) {
            var response = JSON.parse(xhr.response);
            //did it work?
            if (response.status === "pending"){
                getTabScannerFileDetails(token);
                return;
            }
            if (!response.success) {
                //show message and leave
                jQuery.sap.require("sap.m.MessageBox");
                sap.m.MessageBox.show("Failure reading the receipt. please input the values manually");
                return;
            }
            modeloModelRawResponse.setData(response);
            //oButtonDExpenseRaw.setVisible(true);

            //Still here? get content and stick to Fields
            oInputExpenseInfo.setValue(response.result.establishment !== null ? response.result.establishment : "");
            oDatePickerExpenseDate.setDateValue(response.result.date !== null ? new Date(response.result.date) : "");
            oInputExpenseAmount.setValue(response.result.total !== null ? response.result.total : "");
            oSelectExpenseCurrency.setSelectedKey(response.result.currency !== null ? response.result.currency : "");
            jQuery.sap.require("sap.m.MessageBox");
            sap.m.MessageBox.show("Please verify recognised data is correct");
        } else {
            //handle error
            jQuery.sap.require("sap.m.MessageBox");
            sap.m.MessageBox.show("Failure reading the receipt. please input the values manually");
        }

    };
    // oApp.setBusy(true);
    xhr.send();
}