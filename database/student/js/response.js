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
                content +='<div class="content"><div class="top"><span class="title">复查反馈</span><span class="time">'+data[3][i]+'</span></div><div class="bottom"><span>'+data[2][i]+'</span></div></div>';
            }
        }
        obody.innerHTML += content;
    }
}

var aA = document.getElementsByTagName("a");
for(var z=0,length = aA.length;z<length;z++){
    aA[z].href += search;
}