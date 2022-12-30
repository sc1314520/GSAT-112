
window.onload=function(){
    
    const vm = new Vue({
        el:'#box',
        data:{
            school:'',
            schoolM:'',
            department:'',
            sh:[],
            depAll:{},
            sc:['頂','前','均','後','底'],
            ch:'',
            en:'',
            ma:'',
            mb:'',
            so:'',
            se:'',
            flag:true,
            table:[],
            // 取得校名
            url:'https://script.google.com/macros/s/AKfycbzXdyrq05fZZxRyRxggeIto711y1aUUANGrA7Jo5dFK5DQjhNQkKNHlHV_bqblKl4Y/exec',
            // 取得系名
            url2:'https://script.google.com/macros/s/AKfycbwNPxilubMB2N22pM7sjf-A8bx9w3xkFNr0W0Mj2xmytIOvCL2dEiYQUVnxM8Azz1ea/exec',
            // 查詢科系
            url3:'https://script.google.com/macros/s/AKfycbw5LSPtthJQqasGSdFGJGUqQYPA8sJqwevFKGXC5ahB62aRptyZzL0XQU5xvi_DoYU/exec'
        },
        computed:{
            dp(){
                for(key in this.depAll){
                    var arr=[];
                    if(key.trim() == this.school.trim()){
                        arr = this.depAll[key]['departments']
                        arr.shift();
                        arr.unshift("全部顯示");
                        return arr;
                    }
                }
                return "";
            },
            table2(){
                    if(this.school!= this.schoolM){
                        this.getData();
                    }
                    for(t in this.table){
                        if(this.table[t][0].trim()==this.department.trim()){
                            this.flag=false;
                            return this.table[t];
                        }
                    }
                    this.flag=true;
                    return this.table;
            },
        },
        methods:{
            // 設置校名（完成）
            getSchoolName(){
                var config = {
                    method: 'GET',
                    redirect: 'follow'
                };
                fetch(this.url, config)
                .then(response => response.text())
                .then(result => {
                  var data = JSON.parse(result);
                  for(var key in data){
                    this.sh.push(data[key]['schoolName'].split(")")[1]);
                  }
                })
                .catch(error => console.log('error', error));
                
            },
            getDepartment(){
                var config = {
                    method: 'GET',
                    redirect: 'follow'
                };
                fetch(this.url2, config)
                .then(response => response.text())
                .then(result => {
                  var data = JSON.parse(result);
                  this.depAll = data;
                })
                .catch(error => console.log('error', error));
            },
            getData(){
                this.schoolM=this.school;
                let formdata = new FormData();
                formdata.append("school",this.school);
                var config = {
                    method: 'POST',
                    body:formdata,
                    redirect: 'follow'
                };
                fetch(this.url3, config)
                .then(response => response.text())
                .then(result => {
                  var data = JSON.parse(result);
                  this.table = data['data'];
                
                })
                .catch(error => console.log('error', error));
            }
        }
    })
    vm.getSchoolName();
    vm.getDepartment();
}