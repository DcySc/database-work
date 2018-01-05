var search = location.search;
var obody = document.getElementsByTagName("body")[0];

var request_1 = null;
if(XMLHttpRequest){
    request_1 = new XMLHttpRequest();
}else if(ActiveXObject){
    request_1 =new ActiveXObject("Msxml2.XMLHTTP");
}
request_1.open("GET","http://localhost/database/teacher/get_notice.php"+search);
request_1.send();
request_1.onreadystatechange = function(){
    if (request_1.readyState==4 && request_1.status==200){
        var data =  JSON.parse(request_1.responseText);
        var content = "";
        console.log(data);
        if(data == " "){
            content='<div class="content"><div class="empty">暂无数据</div></div>';
        }else{
            for(var i=0,len=data[0].length;i<len;i++){
                content +='<div class="content"><div class="top"><span class="title">学号为'+data[0][i]+'的'+data[1][i]+'同学提出复查申请</span><span class="time">'+data[3][i]+'</span></div><div class="bottom"><span>'+data[2][i]+'</span></div> <div class="btn"><button class="btn_examine" id="'+data[0][i]+'-'+data[4][i]+'-'+data[2][i]+'-'+data[1][i]+'" onclick="_through(this)">通过</button><button class="btn_examine" id="'+data[0][i]+'-'+data[4][i]+'-'+data[2][i]+'-'+data[1][i]+'" onclick="_pass(this) ">驳回</button></div></div>';
            }
        }
        obody.innerHTML += content;
    }
}

function _through(a){
    var tId = a.id;
    var tmsg = tId.split('-');
    var newContent = "学号为"+tmsg[0]+"的"+tmsg[3]+"同学的申请我已初步核实,望教务处进一步核实并修改成绩。";
    var t_input = search + "&subno=" + tmsg[1] + "&con=" + newContent;
    var request_2 = null;
    if(XMLHttpRequest){
        request_2 = new XMLHttpRequest();
    }else if(ActiveXObject){
        request_2 =new ActiveXObject("Msxml2.XMLHTTP");
    }
    request_2.open("GET","http://localhost/database/teacher/through.php"+t_input);
    request_2.send();
    request_2.onreadystatechange = function(){
        if (request_2.readyState==4 && request_2.status==200){
           alert(request_2.responseText);
            
        }
    }
}
function _pass(a){
    var pId = a.id;
    var pmsg = pId.split('-');
    var pnewContent = "经核实你的分数无误,不需修改。";
    var p_input = search + "&subno=" + pmsg[1] + "&con=" + pnewContent+ "&sno=" + pmsg[0];
    var request_3 = null;
    if(XMLHttpRequest){
        request_3 = new XMLHttpRequest();
    }else if(ActiveXObject){
        request_3 =new ActiveXObject("Msxml2.XMLHTTP");
    }
    request_3.open("GET","http://localhost/database/teacher/pass.php"+p_input);
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