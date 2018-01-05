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
    $sql_1="select DISTINCT View_MC_LJY_Class.ClassNo,ClassName from View_MC_HG_Teach,View_MC_LJY_Class where TeacherNo =".$_GET["UserId"]." and View_MC_HG_Teach.ClassNo = View_MC_LJY_Class.ClassNo;";
    $rs_1=odbc_exec($conn,$sql_1);
    while (odbc_fetch_row($rs_1))
    {
        $ClassNo[]=odbc_result($rs_1,"ClassNo");
        $ClassName[]=odbc_result($rs_1,"ClassName");
    }
    $Class[0] = $ClassNo;
    $Class[1] = $ClassName;
    echo json_encode(gbk_to_utf8($Class));
?>