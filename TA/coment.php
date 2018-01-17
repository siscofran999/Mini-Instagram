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
	$id_coment 	= $request->id_coment;
	$coment 	= $request->coment;
	$time       = date("Y/m/d H:i:s");
	$query = "INSERT into komentar(idpost,id, coment, waktu_coment) values('$idpost','$id_coment', '$coment', '$time') ";
	$conn->query($query);
	$querySelect = "SELECT waktu_coment from komentar where id = '$id_coment' and coment = '$coment' and idpost='$idpost' ";
	$result = $conn->query($querySelect);
    $rows = $result->fetch_assoc();
	$kosong= $rows['waktu_coment'];
	$outp = '{"berhasil":"'.$kosong.'"}';
	echo '{"Coment":'.$outp.'}';
}