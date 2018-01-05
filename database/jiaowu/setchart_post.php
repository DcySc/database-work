<?php
    require_once("config.php");
    $conn=odbc_connect($odbc,$user,$password);
    if(!$conn){
        echo "设置失败-1";
    }
    if($_SERVER["REQUEST_METHOD"] == "POST"){
        //处理isV 将字符串转成数组
        $ISV = explode(',',$_POST["isV"]);
        //在试卷表中插入数据
        $sql_1="INSERT INTO MCpaper VALUES ('".$_POST["Id"]."','".$_POST["subjectV"]."');";
        $r1 = odbc_exec($conn,$sql_1);
        //在大题表中插入数据
        $len =$_POST["ibV"];
        for($i = 0;$i < $len;$i++){
            $sql_2="INSERT INTO MCdati VALUES ('".$_POST["Id"]."','".($i+1)."');";
            $r2 = odbc_exec($conn,$sql_2);
            $sql_3="INSERT INTO MCxiaoti VALUES ('".$_POST["Id"]."','".($i+1)."','".$ISV[$i]."');";
            $r3 =odbc_exec($conn,$sql_3);
        }
        if(!$r1)
        {
	        echo "设置失败-2";
        }else if(!$r2){
            echo "设置失败-3";
        }else if(!$r3){
            echo "设置失败-4";
        }else{
            echo "设置成功!";
        }
    }
?>