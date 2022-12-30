function getSchool() {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("school");
    var response = UrlFetchApp.fetch("https://university-tw.ldkrsi.men/caac/");
    var $ = Cheerio.load(response.getContentText(),{ decodeEntities: false }); 
    var data = $(".schools").find("a");
    var length = data.length;
    for( var i =0 ; i<length ;i++){
         var link = "https://university-tw.ldkrsi.men/caac/"+data.eq(i).attr("href");
         if(link.includes("/j")){
           continue;
         }
         else{
           var school = data.eq(i).text()
           sheet.appendRow([school,link])
         } 
    }
 }
 function getDataUrl(){
   var ss = SpreadsheetApp.getActiveSpreadsheet();
   var sheet = ss.getSheetByName("school");
   var link = sheet.getRange(2,1,sheet.getLastRow()-1,2).getValues();
   return link;
 }
 
 function getData(index){
   var ss = SpreadsheetApp.getActiveSpreadsheet();
   var data = getDataUrl();
   console.log(data.length);
       var sheet = ss.getSheetByName((data[index][0]+"").split(")")[1]);
       var response = UrlFetchApp.fetch(getDataUrl()[index][1]);
       var $ = Cheerio.load(response.getContentText(),{ decodeEntities: false }); 
       var data = $(".name-link");
       var count =0;
       for(var j=0 ; j<data.length; j++){
           try{
               var name = data.eq(j).text();
               var chinese = $(".data-cell>div>div").eq(count*2).text();
               count++;
               var english = $(".data-cell>div>div").eq(count*2).text();
               count++;
               var mathA = $(".data-cell>div>div").eq(count*2).text();
               count++;
               var mathB= $(".data-cell>div>div").eq(count*2).text();
               count++;
               var society = $(".data-cell>div>div").eq(count*2).text();
               count++;
               var science = $(".data-cell>div>div").eq(count*2).text();
               count++;
               console.log(name+" "+chinese+" "+english+" "+mathA+" "+mathB+" "+society+" "+science);
               sheet.appendRow([name,chinese,english,mathA,mathB,society,science]);
           }catch(e){
             continue
           }
       }
 }
 
 // 更改表單名稱用
 function createSheet(){
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet =ss.getSheetByName("school");
    var range = sheet.getRange(2,1,sheet.getLastRow()-1,1);
    var data = range.getValues();
    for(var i=0 ; i<data.length;i++){
      var str = data[i][0]
      var school = str.split(")")[1];
      console.log(school);
      ss.getSheetByName("工作表"+(11+i)).setName(school);
    }
    
 }
 // 總執行
 function main(){
   for(var i = 0 ;i<getDataUrl().length;i++){
         getData(i);
   }
 }
 
 // 總表
 function clean(){
   var ss = SpreadsheetApp.getActive();
   var sheets =ss.getSheets();
   for(var i=2 ; i<sheets.length ; i++){
       var arr=[]
       var name = sheets[i].getName();
       arr.push(name);
       var data =sheets[i].getRange(1,1,sheets[i].getLastRow(),1);
       for(var j=0 ; j<data.getValues().length ;j++){
           arr.push(data.getValues()[j][0]);
       }
       sheets[1].appendRow(arr)
   }
 }