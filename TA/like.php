<?php
include "conn.php";
date_default_timezone_set("Asia/Jakarta");

if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');    // cache for 1 day
}
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
 
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers:{$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
}
$postdata = file_get_contents("php://input");
if (isset($postdata)) {
	$request 	= json_decode($postdata);
	$idpost		= $request->idpost;
	$id 		= $request->id;
	$time       = date("Y/m/d H:i:s");
	$sq = "SELECT count(*) as suka from suka where idpost = '$idpost' and id = '$id' ";
	$result = $conn->query($sq);
	$row = $result->fetch_assoc();
	$jml = $row['suka'];
	if($jml == 0){
		$query = "INSERT into suka(idpost,id,waktu_like) values('$idpost','$id','$time') ";
    	$conn->query($query);
    	$kosong='Yee';
		$outp .= '{"berhasil":"'.$kosong.'"}';
		echo '{"Like":'.$outp.'}';
	}else{
		$qr		= "DELETE FROM suka where idpost='$idpost'";
    	$conn->query($qr);
    	$kosong='Yee';
		$outp .= '{"berhasil":"'.$kosong.'"}';
		echo '{"Like":'.$outp.'}';
	}
}