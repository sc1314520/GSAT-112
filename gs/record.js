function doGet() {
    var url = 'https://docs.google.com/spreadsheets/d/1DgtJAvcDIH304fAczjpGYjySmfppJEbI4xatSnQyRkg/edit#gid=0';
    var name = '工作表1'
    var SpreadSheet = SpreadsheetApp.openByUrl(url);
    var SheetName = SpreadSheet.getSheetByName(name);
    var count = SheetName.getSheetValues(1,1,1,1);
    count++;
    var range = SheetName.getRange("A1:A1");
    range.setValues([[count]]);
  
    var result ={
      count:count
    }
    console.log(result);
    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
  }