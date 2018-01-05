var oFinished =document.getElementById("finished");
var oUnFinished =document.getElementById("unfinished");
var search = location.search;
var flag = false;//判断是否全部录入完成
console.log(search);
var request_1 = null;
if(XMLHttpRequest){
    request_1 = new XMLHttpRequest();
}else if(ActiveXObject){
    request_1 =new ActiveXObject("Msxml2.XMLHTTP");
}
request_1.open("GET","http://localhost/database/jiaowu/send_initial.php");
request_1.send();
request_1.onreadystatechange = function(){
    if (request_1.readyState==4 && request_1.status==200){
        var data = JSON.parse(request_1.responseText);
        var content_f;//finished的内容
        var content_u;//unfinished的内容
        console.log(data);
        if(data[0]==" "){
            content_f = `
                            <table>
                                <tr>
                                    <th>工号</th>
                                    <th>教师姓名</th>
                                    <th>教授班级</th>
                                    <th>录入情况</th>
                                </tr>
                                <tr>
                                    <td colspan="4" class="back">暂无数据</td>
                                </tr>
                            </table>
                        `;
        }else{
            content_f = "<table><tr><th>工号</th><th>教师姓名</th><th>教授班级</th><th>录入情况</th></tr>";
            for(var i=0,len=data[0][0].length;i<len;i++){
                content_f += "<tr><td>"+data[0][0][i]+"</td><td>"+data[0][1][i]+"</td><td>"+data[0][2][i]+"</td><td>已完成</td></tr>";
            }
            content_f += "</table><button class='send' onclick='send_grade()'>发布成绩</button>";
        }
        if(data[1]==" "){
            content_u = `
                            <table>
                                <tr>
                                    <th>工号</th>
                                    <th>教师姓名</th>
                                    <th>教授班级</th>
                                    <th>录入情况</th>
                                </tr>
                                <tr>
                                    <td colspan="4" class="back">暂无数据</td>
                                </tr>
                            </table>
                        `;
            flag = true;
        }else{
            content_u = "<table><tr><th>工号</th><th>教师姓名</th><th>教授班级</th><th>录入情况</th></tr>";
            for(var i=0,len=data[1][0].length;i<len;i++){
                content_u += "<tr><td>"+data[1][0][i]+"</td><td>"+data[1][1][i]+"</td><td>"+data[1][2][i]+"</td><td>未完成</td></tr>";
            }
            content_u += "</table>";
        }
        oFinished.innerHTML = content_f;
        oUnFinished.innerHTML = content_u;
    }
}

function send_grade(){
        var request_2 = null;
        if(XMLHttpRequest){
            request_2 = new XMLHttpRequest();
        }else if(ActiveXObject){
            request_2 =new ActiveXObject("Msxml2.XMLHTTP");
        }
        request_2.open("GET","http://localhost/database/jiaowu/send.php");
        request_2.send();
        request_2.onreadystatechange = function(){
            if (request_2.readyState==4 && request_2.status==200){
                alert(request_2.responseText);  
            }
        }
}

var aA = document.getElementsByTagName("a");
for(var z=0,length = aA.length;z<length;z++){
    aA[z].href += search;
}