<?PHP
    require_once("config.php");
    function change($str){
        $encode = mb_detect_encoding($str, array("ASCII",'UTF-8',"GB2312","GBK",'BIG5')); 
        $str_encode = mb_convert_encoding($str, 'GB2312', $encode); 
        return $str_encode;
    }
    $conn=odbc_connect($odbc,$user,$password);

    $subname = change($_GET["subname"]);
    $grade = change($_GET["grade"]);
    $sno = change($_GET["sno"]);
    $year = change($_GET["year"]);
    $term = change($_GET["term"]);

    $sql_1="select SubjectNo from View_MC_HXY_Subject where SubjectName = '".$subname."';";
    $rs_1=odbc_exec($conn,$sql_1);
    if(odbc_num_rows($rs_1)==0){
        echo "修改失败!";
    }else{
        $SubjectNo=odbc_result($rs_1,"SubjectNo");

        
        $sql_2="UPDATE MC_Score SET Score = ".$grade." WHERE Sno = ".$sno." and SubjectNo =".$SubjectNo." and Semester =".$term." and Year =".$year;
        $rs_2=odbc_exec($conn,$sql_2);
        if(odbc_num_rows($rs_2)==0){
            echo "修改失败!";
        }else{
            echo "提交成功!";
        }
    }

?>