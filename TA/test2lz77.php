<?php
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
	$post      	= $request->post;
    $post       = base64_decode($post);
	$waktu      = time();
	$nama_foto  = 'delz77'.$waktu.'.bmp';
    $direct     = 'Fotokompress/'.$nama_foto;
    $foto       = file_put_contents($direct, $post,FILE_APPEND);
 	$kosong= "ye";
    $outp = '{"berhasil":"'.$kosong.'"}';
    echo '{"Post":'.$outp.'}';
}