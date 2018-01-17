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
    $mime      = $request->mime;
    $mime       = substr($mime, 6);
    $post      = base64_decode($post);
    $post      = $huffman->encode($post);
    $time      = date("Y/m/d H:i:s");
    $waktu      = time();
    $nama_foto  = 'HUFFMANen'.$waktu.$id.'.fff';
    $directs    = 'Foto/'.$nama_foto;
    $pdf       = file_put_contents($directs, $post, FILE_APPEND);
    $filesizeEn = filesize($directs);

    $posts 		= $huffman->decode($post);
    $nama_foto  = 'post'.$waktu.$id.'.'.$mime;
    $direct     = 'Foto/'.$nama_foto;
    $pdf       = file_put_contents($direct, $posts);
    $filesizeDe = filesize($direct);

    $query     = "INSERT into posting(idpost,id,caption,post,post_pdf,waktu_post) 
                values('','$id','$caption','$direct','','$time') ";
    $conn->query($query);
    $rasio = ($filesizeEn/$filesizeDe)*100 .' %';
	$outp = '{"rasio":"'.$rasio.'"}';
	echo '{"Post_pdf":'.$outp.'}';
}