
window.onload=function(){
    
    const vm = new Vue({
        el:'#box',
        data:{
            people:'',
            flag:false,
            table:{},
            obj:{},
            // 取得資料
            url:'https://script.google.com/macros/s/AKfycbyhA9HZqB3Kz1hbH2TMAYdgrqfBGikMKIzA4AoVDzINhbkwUlKpRlc_gjntKVS37g0/exec',
            // 統計人數
            url4:'https://script.google.com/macros/s/AKfycbyE-LPI8GmrynF2-h5WJZX724paUTadFHvlku79ouTv0b_E7qIKIaMB0H0QFrJupAE/exec'
        },
        methods:{
            record(){
                var config = {
                    method: 'GET',
                    redirect: 'follow'
                };
                fetch(this.url4, config)
                .then(response => response.text())
                .then(result => {
                  var data = JSON.parse(result);
                  this.people=data['count']
                
                })
                .catch(error => console.log('error', error));
            },
            getData(){
                var config = {
                    method: 'GET',
                    redirect: 'follow'
                };
                fetch(this.url, config)
                .then(response => response.text())
                .then(result => {
                  var data = JSON.parse(result);
                  delete data[0];
                  this.table =data;
                
                })
                .catch(error => console.log('error', error));
            },
            insert(t){
                this.flag=true;
                this.obj['schoolName']=t.schoolName;
                this.obj['department']=t.department;
                this.obj['condition']=t.condition;
                this.obj['level']=t.level;
                this.obj['question']=t.question;
                this.obj['feedback']=t.feedback;
            },
            close(){
                this.flag=false;
            }
        }
    })
   vm.record();
   vm.getData();
   document.getElementById("ar").onclick=function(){
    window.location.href="https://sc1314520.github.io/GSAT-112/index.html";
   }
}