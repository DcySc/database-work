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
    $sql_1="UPDATE MC_Score SET Ispublish = 1";
    $rs_1=odbc_exec($conn,$sql_1);
    
    echo "发布成功!";
  
?>