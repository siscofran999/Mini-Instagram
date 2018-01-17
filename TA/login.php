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
	$id        	= $request->id;
	$pass       = $request->pass;
	$IP 		= getHostByName(getHostName());
	$tgl 		= date("Ymd");
	$time   	= date("Y/m/d H:i:s");
	$api 		= sha1("ip" . $IP. md5($tgl) . "IP");
	$key		= "Pr06r4mM3R";
	$pass 		= md5(md5($pass).$key);
	$sq = "SELECT password, nama, id, email from user where id = '$id' ";
	$result = $conn->query($sq);
	$row = $result->fetch_assoc();
	$sql = "UPDATE user set Lastlogin='$time' where id = '$id' ";
	$re = $conn->query($sql);
	$password = $row['password'];
	$nama = $row['nama'];
	$id = $row['id'];
	$email = $row['email'];
	$outp = '';
	if($pass == $password){
		$outp .= '{"nama":"'.$nama.'",';
		$outp .= '"id":"'.$id.'",';
		$outp .= '"email":"'.$email.'",';
		$outp .= '"pass":"'.$password.'",';
		$outp .= '"api":"'.$api.'"}';
		echo '{"Yes":'.$outp.'}';
	}else{
		$kosong='tidak sama';
		$outp .= '{"pass":"'.$kosong.'"}';
		echo '{"Maaf":'.$outp.'}';
	}
}