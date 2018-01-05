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
    $sql_1="select Score,SubjectNo from MC_Score where Sno =".$_GET["UserId"]." and Year=".$_GET["year"]." and semester=".$_GET["term"]." and Ispublish = 1";
    $rs_1=odbc_exec($conn,$sql_1);
    if(odbc_num_rows($rs_1)==0){
        $Class =" ";
    }else{
        while (odbc_fetch_row($rs_1))
        {
            $Score[]=odbc_result($rs_1,"Score");
            $SubjectNo[]=odbc_result($rs_1,"SubjectNo");
        }
        $Class[0] = $Score;
    }
    $len = count($SubjectNo);
    for($i=0;$i<$len;$i++){
        $sql_2="select SubjectName from View_MC_HXY_Subject where SubjectNo=".$SubjectNo[$i];
        $rs_2=odbc_exec($conn,$sql_2);
        while (odbc_fetch_row($rs_2))
        {
            $SubjectName[]=odbc_result($rs_2,"SubjectName");
        }
    }
    $Class[1]=$SubjectName;
    echo json_encode(gbk_to_utf8($Class));
?>