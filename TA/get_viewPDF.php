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
	$fromUrls 	= $request->fromUrls;
	$querySelect = "SELECT post_pdf from posting where idpost = '$idpost' and post = '$fromUrls' ";
	$result = $conn->query($querySelect);
    $rows = $result->fetch_assoc();
    $post_pdf = str_replace('fff', 'pdf', $rows['post_pdf']);
    if($post_pdf){
    	$kosong= $post_pdf;
		$outp = '{"PDF":"'.$kosong.'"}';
		echo '{"get":'.$outp.'}';
    }
}