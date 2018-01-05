var choose_1 = document.getElementsByClassName("choose_1")[0];
var choose_2 = document.getElementsByClassName("choose_2")[0];
var oTable = document.getElementById("pre");
var oSubject = document.getElementById("subject");
var oYear = document.getElementById("year");
var search = location.search;

var yearV, termV, subjectV, ibV, gradeV;//用来储存当前的学年 学期 科目 大题数
var isV = [];//存放小题的数组

function display_choose_1(){//显示大题数select标签
    var year = document.getElementById("year");
    var yearValue =year.options[year.selectedIndex].value;
    yearV = yearValue;

    var term = document.getElementById("term");
    var termValue =term.options[term.selectedIndex].value;
    termV = termValue;

    var subject = document.getElementById("subject");
    var subjectValue =subject.options[subject.selectedIndex].value;
    subjectV = subjectValue;

    var grade = document.getElementById("grade");
    var gradetValue =grade.options[grade.selectedIndex].value;
    gradeV = gradetValue;

    if(yearValue && termValue && subjectValue){
        choose_1.style.display = "block";
        clearInterval(timer_1);
    }
}
var timer_1 = setInterval(display_choose_1,1000);

function display_choose_2(){//显示小题区域
    var item_b = document.getElementById("item_b");
    var ibValue =item_b.options[item_b.selectedIndex].value;
    ibV = ibValue;

    if(ibValue){                    
        clearInterval(timer_2);
        choose_2.style.display = "block";
        var oForm =document.createElement("form");
        choose_2.appendChild(oForm);
        for(var i=0;i<ibValue;i++){
            var oInput = document.createElement("input");
            oInput.className = "item_s";
            oInput.type = "text";
            oForm.appendChild(oInput);
        }
        var obr =document.createElement("br");
        choose_2.appendChild(obr);
        var obtu = document.createElement("button");
        obtu.innerHTML = "确定";
        obtu.onclick = createtable;
        choose_2.appendChild(obtu);
        var ohr =document.createElement("hr");
        choose_2.appendChild(ohr);

    }
}
var timer_2 = setInterval(display_choose_2,1000);


function createtable(){
    pre.innerHTML="";
    var num = 0;
    var oCaption = document.createElement("caption");
    oCaption.innerHTML = "'"+yearV+"第"+termV+"学期"+gradeV+"年级"+subjectV+"成绩表'";
    oTable.appendChild(oCaption);

    var otr = document.createElement("tr");
    otr.className = "title";
    oTable.appendChild(otr);

    var otitle_1 = document.getElementsByClassName("title")[0];
    var oth_1 = document.createElement("th");
    oth_1.innerHTML = "学号" ; 
    otitle_1.appendChild(oth_1);
    var oth_2 = document.createElement("th");
    oth_2.innerHTML ="姓名" ;
    otitle_1.appendChild(oth_2);

    for(var i=1;i<=ibV;i++){
        var input = document.getElementsByClassName("item_s")[i-1].value;
        isV[i-1] = input;
        for(var j=1;j<=input;j++){
            var oTh = document.createElement("th");
            oTh.innerHTML = i +' ( '+ j +' )';
            otitle_1.appendChild(oTh);
        }
        num = num + parseInt(input);
    }
    var oth_3 = document.createElement("th");
    oth_3.innerHTML ="总分" ;
    otitle_1.appendChild(oth_3);

    var otr_2 = document.createElement("tr");
    otr_2.className = "title";
    oTable.appendChild(otr_2);
    var otitle_2 = document.getElementsByClassName("title")[1];
    for(var k=0;k<num+3;k++){
        var oTh = document.createElement("th");
        oTh.innerHTML = " ";
        otitle_2.appendChild(oTh);
    }
    oTable.style.display="table";


    //console.log(yearV, termV, subjectV, ibV, gradeV);
    var request_1 = null;
    if(XMLHttpRequest){
        request_1 = new XMLHttpRequest();
    }else if(ActiveXObject){
        request_1 =new ActiveXObject("Msxml2.XMLHTTP");
    }
    request_1.open("POST","http://localhost/database/jiaowu/setchart_post.php");
    request_1.setRequestHeader("Content-type","application/x-www-form-urlencoded");
     
    var Id = thisyear+termV+subjectV+gradeV;//拼接卷子id
    //console.log(Id);
    var send = "Id="+Id+"&subjectV="+subjectV+"&ibV="+ibV+"&isV="+isV;//拼接卷子信息
    console.log(send);
    request_1.send(send);
    request_1.onreadystatechange = function(){
        if (request_1.readyState==4 && request_1.status==200){
            alert(request_1.responseText);
            console.log(request_1.responseText);
        }
    }
}


//设置学年select
var oDate =new Date();
var thisyear = oDate.getFullYear();
oYear.innerHTML += '<option value="'+(thisyear-1)+"-"+thisyear +'">'+(thisyear-1)+"-"+thisyear +'</option>';
//处理thisyear
thisyear = thisyear + "";
thisyear = thisyear.substr(2,2);


//获取并设置科目select
var request = null;
if(XMLHttpRequest){
    request = new XMLHttpRequest();
}else if(ActiveXObject){
    request =new ActiveXObject("Msxml2.XMLHTTP");
}
request.open("GET","http://localhost/database/jiaowu/setchart_get.php");
request.send();
request.onreadystatechange = function(){
    if (request.readyState==4 && request.status==200){
        d = JSON.parse(request.responseText);
        for(var i = 1,len = d[0].length;i < len;i++){
            oSubject.innerHTML += '<option value="'+d[0][i]+'">'+d[1][i]+'</option>';
        }
    }
}


var aA = document.getElementsByTagName("a");
for(var z=0,length = aA.length;z<length;z++){
    aA[z].href += search;
}