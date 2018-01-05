<?PHP
    require_once("config.php");
    function change($str){
        $encode = mb_detect_encoding($str, array("ASCII",'UTF-8',"GB2312","GBK",'BIG5')); 
        $str_encode = mb_convert_encoding($str, 'GB2312', $encode); 
        return $str_encode;
    }
    $uid =change($_GET["UserId"]);
    $uname =change($_GET["UserName"]);
    $sno =change($_GET["subno"]);
    $con =change($_GET["con"]);


    $conn=odbc_connect($odbc,$user,$password);
    $sql_1="INSERT  INTO MC_Review (Sno,Sname,Subject_id,Tno,Reason) VALUES ('".$uid."','".$uname."','".$sno."','123456','".$con."');";
    $rs_1=odbc_exec($conn,$sql_1);
    
    echo "发送成功";
?>