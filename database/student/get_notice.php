<?PHP
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
    $sql_1="select Sno,Sname,Reason,Time,Subject_id from MC_Review where Tno=".$_GET["UserId"];
    $rs_1=odbc_exec($conn,$sql_1);
    if(odbc_num_rows($rs_1)==0){
        $message = " ";
    }else{
        while (odbc_fetch_row($rs_1))
        {
            $Sno[]=odbc_result($rs_1,"Sno");
            $Sname[]=odbc_result($rs_1,"Sname");
            $Reason[]=odbc_result($rs_1,"Reason");
            $Date[] =odbc_result($rs_1,"Time");
        }
        $message[0] =$Sno;
        $message[1] =$Sname;
        $message[2] =$Reason;
        $message[3] =$Date;
    }
    echo json_encode(gbk_to_utf8($message));
    
?>