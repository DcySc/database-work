<?PHP
    require_once("config.php");
    function change($str){
        $encode = mb_detect_encoding($str, array("ASCII",'UTF-8',"GB2312","GBK",'BIG5')); 
        $str_encode = mb_convert_encoding($str, 'GB2312', $encode); 
        return $str_encode;
    }
    $conn=odbc_connect($odbc,$user,$password);

    $subname = change($_GET["subname"]);
    $tname = change($_GET["tname"]);
    $sname = change($_GET["sname"]);
    $reason = change($_GET["reason"]);

    $sql_1="select SubjectNo from View_MC_HXY_Subject where SubjectName = '".$subname."';";
    $rs_1=odbc_exec($conn,$sql_1);
    if(odbc_num_rows($rs_1)!=0){
        $SubjectNo=odbc_result($rs_1,"SubjectNo");

        
        $sql_2="select Tno from View_MC_HXY_Teacher where SubjectNo = '".$SubjectNo."' and Tname ='".$tname."';";
        $rs_2=odbc_exec($conn,$sql_2);
        if(odbc_num_rows($rs_2)!=0){  
            $Tno = odbc_result($rs_2,"Tno");
            $sql_3="INSERT  INTO MC_Review (Sno,Sname,Subject_id,Tno,Reason) VALUES ('".$_GET["sno"]."','".$sname."','".$SubjectNo."','".$Tno."','".$reason."');";
            $rs_3=odbc_exec($conn,$sql_3);
            echo "提交成功!";

        }else{
            echo "提交失败!";
        }
    }else{
        echo "提交失败!";
    }
?>