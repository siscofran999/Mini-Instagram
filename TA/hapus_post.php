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
    $idpost     = $request->idpost;
    $qy 		= "SELECT post, post_pdf from posting where idpost='$idpost'";
    $result 	= $conn->query($qy);
    $row 		= $result->fetch_assoc();
    $post = $row['post'];
    $post_pdf = $row['post_pdf'];
    if($post && $post_pdf){
    	unlink($post);
    	unlink($post_pdf);
    }else if($post && $post_pdf == ''){
    	unlink($post);
    }
    $query		= "DELETE FROM posting where idpost='$idpost'";
    $conn->query($query);
    $qr		= "DELETE FROM suka where idpost='$idpost'";
    $conn->query($qr);
    $sq		= "DELETE FROM komentar where idpost='$idpost'";
    $conn->query($sq);
    $outp = '{"berhasil":"Ye"}';
	echo '{"hapus":'.$outp.'}';
    
}