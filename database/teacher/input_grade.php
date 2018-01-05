<?PHP
    require_once("config.php");

    $conn=odbc_connect($odbc,$user,$password);
    $sql_1="select Sno,Sname from View_MC_HZY_Student where ClassNo=".$_GET["classno"];
    $rs_1=odbc_exec($conn,$sql_1);
    while (odbc_fetch_row($rs_1))
    {
        $Sno[]=odbc_result($rs_1,"Sno");
        $Sname[]=odbc_result($rs_1,"Sname");
    }
    $s = explode(',',$_GET["s"]);

    $sql_4="select SubjectNo from View_MC_HXY_Teacher where Tno=".$_GET["UserId"];
    $rs_4=odbc_exec($conn,$sql_4);
    $SubjectNo = odbc_result($rs_4,"SubjectNo");


    $len = count($Sno);
    for($i = 0;$i < $len;$i++){
        $sql_2="INSERT INTO MC_Score VALUES ('".$Sno[$i]."','".$Sname[$i]."','".$s[$i]."','".$_GET["year"]."','".$_GET["term"]."','0','".$SubjectNo."');";
        $r2 = odbc_exec($conn,$sql_2);
    }
    $sql_3="UPDATE MC_Submit SET Issubmit = 1 WHERE Tno = ".$_GET["UserId"]." and ClassNo =".$_GET["classno"];
    $r3 = odbc_exec($conn,$sql_3);
    echo "提交成功";
?>