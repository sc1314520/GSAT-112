function doGet() {
    var ss =SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("all");
    var data = sheet.getDataRange().getValues();
    var dataExport = {};
    for(var i = 0; i < data.length; i++) {
      var schoolName = data[i][0];
      var departments = [];
      for(var j=0 ; j<data[i].length ;j++){
          if(data[i][j]!='' || data[i][j].trim().length!=0){
            departments.push(data[i][j]);
          }
      }
      dataExport[schoolName] = {
        departments:departments
      }
    }
    var dataExportFormat = JSON.stringify(dataExport);
    console.log(dataExportFormat)
    return ContentService.createTextOutput(dataExportFormat).setMimeType(ContentService.MimeType.JSON);
}