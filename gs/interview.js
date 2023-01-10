function doGet() {
    var ss =SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getActiveSheet();
    var data =sheet.getDataRange().getValues();
    var dataExport = {};
    for(var i = 0; i < data.length; i++) {
      dataExport[i] = {
        schoolName: data[i][1],
        department: data[i][2],
        condition: data[i][3],
        level:data[i][4],
        question:data[i][5],
        feedback:data[i][6],
      }  
    }
    console.log(dataExport);
    var dataExportFormat = JSON.stringify(dataExport);
    return ContentService.createTextOutput(dataExportFormat).setMimeType(ContentService.MimeType.JSON);
}
