function doGet() {
  var ss =SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("name");
  var data = sheet.getDataRange().getValues();
  var dataExport = {};
  for(var i = 1; i < data.length; i++) {
    dataExport[i] = {
      schoolName: data[i][0],
    }  
  }
  console.log(dataExport);
  var dataExportFormat = JSON.stringify(dataExport);
  return ContentService.createTextOutput(dataExportFormat).setMimeType(ContentService.MimeType.JSON);
}

