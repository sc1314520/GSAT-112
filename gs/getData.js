function doPost(e) {
    var ss =SpreadsheetApp.getActiveSpreadsheet();
    var param = e.parameter;
    var school =param.school;
    var sheet =ss.getSheetByName(" "+school);
    var data =sheet.getDataRange();
    console.log(data.getValues());

    var dataExport = {
      data:data.getValues()
    };
    console.log(dataExport);
    var dataExportFormat = JSON.stringify(dataExport);
    console.log(dataExportFormat);
    return ContentService.createTextOutput(dataExportFormat).setMimeType(ContentService.MimeType.JSON);
 
}

