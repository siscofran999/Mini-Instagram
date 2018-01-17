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
    require_once ('Huffman.php');
    $huffman = new Huffman();
	$request 	= json_decode($postdata);
    $post      = $request->post;
    // $posts      = base64_decode($posts);
    // $post       = $huffman->encode($posts);
    $waktu      = time();
    $nama_foto  = 'LZ77'.$waktu.'.fff';
    $direct     = 'Fotokompress/'.$nama_foto;
    $foto       = file_put_contents($direct, $post, FILE_APPEND);
    //$filesizeEn = filesize($direct);
    $gambar = file_get_contents($direct);
    $gambar = base64_encode($gambar);
    //$gambar = $huffman->decode($gambar);
    // $nama_foto  = 'lz77'.$waktu.'.bmp';
    // $directs    = 'Fotokompress/'.$nama_foto;
    // $foto   = file_put_contents($directs, $gambar);
    //$filesizeDe = filesize($directs);
    //echo $filesizeDe.' kb ';
    //echo 'Rasio % :  '.(100 * ($filesizeEn / $filesizeDe)).'%<br /><br />';
    $kosong= "ye";
    $outp = '{"berhasil":"'.$gambar.'"}';
    echo '{"Post":'.$outp.'}';
}
?>