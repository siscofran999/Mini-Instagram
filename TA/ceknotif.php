<?php
include "conn.php";
date_default_timezone_set("Asia/Jakarta");
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
$postdata = file_get_contents("php://input");
if(isset($_GET['nothing'])){
	$sql = "SELECT max(idpost) as idpost from posting";    
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
    $idpost = $row['idpost'];
    $outp = '{"tif":"'.$idpost.'"}';
	echo '{"notif":'.$outp.'}';
}else if(isset($_GET['idpost'])){
	$idpost = $_GET['idpost'];
	$qu = "SELECT id from posting where idpost > $idpost ";
	$re = $conn->query($qu);
	$riw = $re->fetch_assoc();
	$id = $riw['id'];

	if($id != null){
	    $outp = '{"notif":"'.$id.'"}';
	    echo '{"Push":'.$outp.'}';
	}
}
	

	
