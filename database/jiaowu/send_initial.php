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
    $sql_1="select * from MC_Submit where Issubmit = 1;";
    $rs_1=odbc_exec($conn,$sql_1);
    if(odbc_num_rows($rs_1)==0){
        $finish =" ";
    }else{
        while (odbc_fetch_row($rs_1))
        {
            $f_Tno[]=odbc_result($rs_1,"Tno");
            $f_ClassNo[]=odbc_result($rs_1,"ClassNo");

            $finish[0]= $f_Tno;
            $finish[2]= $f_ClassNo;
        }
    }
    if($finish != " "){
        $f_len = count($f_Tno);
        for($i=0;$i<$f_len;$i++){
            $sql_3="select DISTINCT Tname from View_MC_HXY_Teacher where Tno =".$f_Tno[$i]." ;";
            $rs_3=odbc_exec($conn,$sql_3);
            $f_Tname[] = odbc_result($rs_3,"Tname");
        }
        $finish[1] = $f_Tname;
    }






    $sql_2="select * from MC_Submit where Issubmit = 0;";
    $rs_2=odbc_exec($conn,$sql_2);
    if(odbc_num_rows($rs_2)==0){
        $unfinish =" ";
    }else{
        while (odbc_fetch_row($rs_2))
        {
            $u_Tno[]=odbc_result($rs_2,"Tno");
            $u_ClassNo[]=odbc_result($rs_2,"ClassNo");

            $unfinish[0]= $u_Tno;
            $unfinish[2]= $u_ClassNo;
        }
    }

    if($unfinish != " "){
        $u_len = count($u_Tno);
        for($i=0;$i<$u_len;$i++){
           
            $sql_4="select DISTINCT Tname from View_MC_HXY_Teacher where Tno =".$u_Tno[$i]." ;";
            $rs_4=odbc_exec($conn,$sql_4);
            $u_Tname[] = odbc_result($rs_4,"Tname");

        }
        $unfinish[1] = $u_Tname;
    }



    $return[0] = $finish;
    $return[1] = $unfinish;
    echo json_encode(gbk_to_utf8($return));
  
?>