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
	require_once ('Huffman.php');
	$huffman = new Huffman();
	$request = json_decode($postdata);
    $id        = $request->id;
    $caption   = $request->caption;
    $post      = $request->post;
    $post      = $huffman->encode($post);
    $time      = date("Y/m/d H:i:s");
    $waktu      = time();
    $nama_foto  = 'compressGAB'.$waktu.$id.'.fff';
    $directs    = 'PDF/'.$nama_foto;
    $pdf       = file_put_contents($directs, $post, FILE_APPEND);
    $filesizeEn = filesize($directs);

    $posts 		= $huffman->decode($post);
    $posts      = base64_encode($posts);

    $outp = "";
    $outp .= '{"data":"'.$posts.'",';
	$outp .= '"filesize":"'.$filesizeEn.'"}';
	echo '{"Post_pdf":'.$outp.'}';
}