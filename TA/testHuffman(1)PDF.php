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
    $post      = base64_decode($post);
    $post      = $huffman->encode($post);
    $time      = date("Y/m/d H:i:s");
    $waktu      = time();
    $nama_foto  = 'HUFFMANen'.$waktu.$id.'.fff';
    $directs    = 'PDF/'.$nama_foto;
    $pdf       = file_put_contents($directs, $post, FILE_APPEND);
    $filesizeEn = filesize($directs);

    $posts 		= $huffman->decode($post);
    $nama_foto  = 'post'.$waktu.$id.'.pdf';
    $direct     = 'PDF/'.$nama_foto;
    $pdf       = file_put_contents($direct, $posts);
    $filesizeDe = filesize($direct);

    $im = new imagick(__DIR__ . DIRECTORY_SEPARATOR .$direct.'[0]'); // simpan thumbnail pdf
    $im->setImageFormat('jpg');
    header('Content-Type: image/jpeg');
    $waktu      = time();
    $nama_foto  = 'thumbnail'.$waktu.$id.'.jpg';
    $direct2    = 'Foto/'.$nama_foto;
    $foto       = file_put_contents($direct2, $im);

    $query     = "INSERT into posting(idpost,id,caption,post,post_pdf,waktu_post) 
                values('','$id','$caption','$direct2','$direct','$time') ";
    $conn->query($query);
    $rasio = ($filesizeEn/$filesizeDe)*100 .' %';
	$outp = '{"rasio":"'.$rasio.'"}';
	echo '{"Post_pdf":'.$outp.'}';
}