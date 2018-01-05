var oYear = document.getElementById("year");
var oQG = document.getElementById("query_grade");
var oReCheck = document.getElementById('recheck');
var search = location.search;

function GetQueryString(name) {  
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");  
    var r = window.location.search.substr(1).match(reg);  //获取url中"?"符后的字符串并正则匹配
    var context = "";  
    if (r != null)  
         context = r[2];  
    reg = null;  
    r = null;  
    return context == null || context == "" || context == "undefined" ? "" : context;  
}

//计算该学生的所有学年学期
var user = GetQueryString("UserId");
var year = user.substr(0,2);

year = "20" + year;
var thisYear = parseInt(year); //获取该生的入学年份

var date =new Date();
var nowYear = date.getFullYear();
var nowMonth = new Date().getMonth();
console.log(thisYear);
if(nowMonth>=3 &&nowMonth <=9){
    var flag = true;
}
for(var i=thisYear; i<nowYear+1; i++){
    oYear.innerHTML += "<option value = "+i+"01>"+i+"年第一学期</option>"
    if(!flag && i !== nowYear){
        oYear.innerHTML += "<option value = "+i+"02>"+i+"年第二学期</option>"
    }
}
function Change(values){
    var term = values.substr(5,1);
    var year = values.substr(0,4);
    var getMessage = "?UserId="+user+"&term="+term+"&year="+year;
    console.log(getMessage);
    var request = null;
    if(XMLHttpRequest){
        request = new XMLHttpRequest();
    }else if(ActiveXObject){
        request =new ActiveXObject("Msxml2.XMLHTTP");
    }
    request.open("GET","http://localhost/database/student/student_initial.php"+getMessage);
    request.send();
    request.onreadystatechange = function(){
        if (request.readyState==4 && request.status==200){
            var data = JSON.parse(request.responseText);
            if(data != " "){
                var content = "<table><tr><th>学年</th><th>学期</th><th>科目</th><th>总分</th></tr>";
                console.log(data);
                for(var i=0,len=data[0].length;i<len;i++){
                    content += "<tr><td>"+year+"</td><td>"+term+"</td><td>"+data[1][i]+"</td><td>"+data[0][i]+"</td></tr>";
                }
                content += "</table>";
                oQG.innerHTML = content;
            }
        }
    }
}
function recheck(){
    oReCheck.style.display = "block";
}
function close_recheck(){
    oReCheck.style.display = "none";
}
function submit(){
    var oSno = document.getElementById('_Sno').innerHTML;
    var oSname = document.getElementById('_Sname').innerHTML;
    var oTname = document.getElementById('_Tname').innerHTML;
    var oSubjectName = document.getElementById('_Subjectname').innerHTML;
    var oReason = document.getElementById('_reason').value;

    if(oSno && oSname &&  oTname && oSubjectName && oReason){
        
        var apply ="?sno="+oSno+"&sname="+oSname+"&tname="+oTname+"&subname="+oSubjectName+"&reason="+oReason;
        console.log(apply);
        var request_1 = null;
        if(XMLHttpRequest){
            request_1 = new XMLHttpRequest();
        }else if(ActiveXObject){
            request_1 =new ActiveXObject("Msxml2.XMLHTTP");
        }
        request_1.open("GET","http://localhost/database/student/apply.php"+apply);
        request_1.send();
        request_1.onreadystatechange = function(){
            if (request_1.readyState==4 && request_1.status==200){
                alert(request_1.responseText)
            }
        }
    }else{
        alert("信息不全!");
    }
}

var aA = document.getElementsByTagName("a");
for(var z=0,length = aA.length;z<length;z++){
    aA[z].href += search;
}