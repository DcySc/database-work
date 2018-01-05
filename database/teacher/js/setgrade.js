var search = location.search;
var oClas = document.getElementById("clas");
var oInput = document.getElementById("input_grade");
var student_num = null;//学生数量
var item_num = null;//题目数量
var classno;
var aSocre;
var socre =  new Array(100);   //存放成绩
for(var i = 0;i < socre.length; i++){  
    socre[i] = new Array(10);    
}  
//获取该老师所教的班级
console.log("search: "+search);
var request_1 = null;
if(XMLHttpRequest){
    request_1 = new XMLHttpRequest();
}else if(ActiveXObject){
    request_1 =new ActiveXObject("Msxml2.XMLHTTP");
}
request_1.open("GET","http://localhost/database/teacher/setgrade.php"+search);
request_1.send();
request_1.onreadystatechange = function(){
    if (request_1.readyState==4 && request_1.status==200){
        var data =  JSON.parse(request_1.responseText);
        //console.log(data);
        var len = data[0].length;
        for(var i=0;i<len;i++){
            oClas.innerHTML += "<option value="+data[0][i]+">"+data[1][i]+"</option>";
        }
    }
}

//设置初始表格
//获取当前学年学期
var date =new Date();
var month = date.getMonth();
if(month>=3 && month<=9){
    var year = date.getFullYear()+"";
    year =  year.substr(2,2)
    time = year +"02";
}else{
    var year = date.getFullYear()+"";
    year =  year.substr(2,2)
    time = year +"01";
}

function btnChange(values){
    console.log(values);
    classno= values;
    //计算老师所选择的年级
    var grade = "0"+(parseInt(year)-parseInt(values.substr(0,2))+1);
    //拼接url
    var getmessage =search+"&time="+time +"&grade="+grade+"&classno="+values;
    console.log("getmessages: "+getmessage);
    var request_2 = null;
    if(XMLHttpRequest){
        request_2 = new XMLHttpRequest();
    }else if(ActiveXObject){
        request_2 =new ActiveXObject("Msxml2.XMLHTTP");
    }
    request_2.open("GET","http://localhost/database/teacher/initial_chart.php"+getmessage);
    request_2.send();
    request_2.onreadystatechange = function(){
        if (request_2.readyState==4 && request_2.status==200){
            var data =  JSON.parse(request_2.responseText);
            console.log("data:"+data.length);
            var content = "<table><tr><th>学号</th><th>姓名</th>";
            var count = 0;
            
            for(var i=0,len=data[2][0].length;i<data[0];i++){
                for(var j=0;j<data[1][i];j++){
                    content += "<th>"+(i+1)+"("+(j+1)+")</th>";
                    count++;
                }
            }
            content += "<th>总分</th></tr>";
            for(var m=0;m<len;m++){
                content += "<tr><td>"+data[2][0][m]+"</td><td>"+data[2][1][m]+"</td>";
                for(var n=0;n<count;n++){
                    content += "<td class ='item"+m+"' id='"+n+"' contentEditable='true' onblur='compute(this)'></td>";
                }
                content += "<td class='Score'>0</td></tr>"
            }
            content +="</table><button onclick='submit()'>确认提交</button>";
            oInput.innerHTML = content;
            student_num = len;
            item_num = count;
            aSocre = document.getElementsByClassName("Score");
        }
    }
}

//计算总分
function compute(obj){
    var cn = obj.className;
    var id = parseInt(obj.id);
    var sum = 0;
    var aTd = document.getElementsByClassName(cn);
    cn = parseInt(cn.substr(4,1));
    for(var i=0;i<item_num;i++){
        if(aTd[i].innerHTML !== ""){
            sum += parseInt(aTd[i].innerHTML);
            socre[cn][id]=parseInt(aTd[i].innerHTML);
        }
    }
    aSocre[cn].innerHTML = sum;
}

function submit(){
    for(var i=0;i<student_num;i++){
        for(var j=0;j<item_num;j++){
            if(socre[i][j] == null){
                alert("还未完成输入!");
                return;
            }
        }
    }
    if(month>=3 && month<=9){
        var term = "2";
    }else{
        var term = "1";
    }
    var s=[];
    for(var i = 0;i<aSocre.length;i++){
        s[i] = aSocre[i].innerHTML;
    }
    var input =search+"&year="+date.getFullYear()+"&classno="+classno+"&term="+term+"&s="+s;
    console.log(input);
    var request_3 = null;
    if(XMLHttpRequest){
        request_3 = new XMLHttpRequest();
    }else if(ActiveXObject){
        request_3 =new ActiveXObject("Msxml2.XMLHTTP");
    }
    request_3.open("GET","http://localhost/database/teacher/input_grade.php"+input);
    request_3.send();
    request_3.onreadystatechange = function(){
        if (request_3.readyState==4 && request_3.status==200){
            alert(request_3.responseText);
        }
    }
}

var aA = document.getElementsByTagName("a");
for(var z=0,length = aA.length;z<length;z++){
    aA[z].href += search;
}