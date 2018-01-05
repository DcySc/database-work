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
    $sql_1="select * from View_MC_HXY_Subject;";
    $rs_1=odbc_exec($conn,$sql_1);
    while (odbc_fetch_row($rs_1))
    {
        $SubjectNo=odbc_result($rs_1,"SubjectNo");
        $SubjectName =odbc_result($rs_1,"SubjectName");
        $SNo[] = $SubjectNo;
        $SName[] = $SubjectName;
    }
    $Sub[0] = $SNo;
    $Sub[1] = $SName;
    echo json_encode(gbk_to_utf8($Sub));
?>