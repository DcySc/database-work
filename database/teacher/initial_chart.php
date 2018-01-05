<?php
    require_once("config.php");

    function gbk_to_utf8($data) {  
        if( is_array($data) ) {  
            foreach ($data as $k => $v) {  
                if ( is_array($v) ) {  
                    $data[$k] = gbk_to_utf8($v);  
                } else {  
                    $data[$k] = iconv('gbk', 'utf-8', $v);  
                }  
            }  
            return $data;  
        } else {  
            $data = iconv('gbk', 'utf-8', $data);  
            return $data;  
        }  
    }  

    $conn=odbc_connect($odbc,$user,$password);
    //拼接试卷id
    $sql_1="select SubjectNo from View_MC_HXY_Teacher where Tno=".$_GET["UserId"];
    $rs_1=odbc_exec($conn,$sql_1);
    $SubjectNo=odbc_result($rs_1,"SubjectNo");
    $Id = $_GET["time"].$SubjectNo.$_GET["grade"];
    //获取大题数组
    $sql_2="select DT_number from MCdati where Paper_id=".$Id;
    $rs_2=odbc_exec($conn,$sql_2);
    while (odbc_fetch_row($rs_2))
    {
        $dati[]=odbc_result($rs_2,"DT_number");
    }
    $len = count($dati);
    //获取每大题的小题数
    for($i = 0;$i < $len;$i++){
        $sql_3="select XT_number from MCxiaoti where Paper_id=".$Id."and DT_number=".($i+1);
        $rs_3=odbc_exec($conn,$sql_3);
        $xiaoti[]=odbc_result($rs_3,"XT_number");
    }
    //获取该班级的学生信息
    $sql_4="select Sno,Sname from View_MC_HZY_Student where ClassNo=".$_GET["classno"];
    $rs_4=odbc_exec($conn,$sql_4);
    while (odbc_fetch_row($rs_4))
    {
        $Sno[]=odbc_result($rs_4,"Sno");
        $Sname[]=odbc_result($rs_4,"Sname");
    }
    $student[0] =$Sno;
    $student[1] =$Sname;
    //返回表格信息
    $message[0] = $len;
    $message[1] = $xiaoti;
    $message[2] = $student;
    echo json_encode(gbk_to_utf8($message));
?>