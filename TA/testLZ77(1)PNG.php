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
	$request   = json_decode($postdata);
    require_once ('Huffman.php');
    $huffman = new Huffman();
    $id        = $request->id;
    $caption   = $request->caption;
    $post      = $request->post;
    $post      = $huffman->encode($post);
    $mime      = $request->mime;
    $mime      = substr($mime, 6);
    if($mime == 'png'){
        $kode = 'P';
    }elseif($mime == 'bmp'){
        $kode = 'B';
    }else{
        $kode = 'J';
    }
    $time      = date("Y/m/d H:i:s");
    $sql = "SELECT max(idpost) as idpost from posting";    
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
    $idpost = $row['idpost'];
    if($row['idpost'] == 0){
        $idpost = 1;
    }else{
        $idpost = $row['idpost']+1;
    }
    $nama_pdf  = 'post'.$id.$idpost.$kode.'.fff';
    $direct    = 'Foto/'.$nama_pdf;
    $foto      = file_put_contents($direct, $post);
    
    $posts      = $huffman->decode($post);
    $posts      = base64_encode($posts);

    $filesizeEn = filesize($direct);
    
    $query = "INSERT into posting(idpost,id,caption,post,post_pdf,waktu_post) 
                values('$idpost','$id','$caption','$direct','','$time') ";
                $conn->query($query);
    $outp = "";
    $outp .= '{"data":"'.$posts.'",';
    $outp .= '"berhasil":"'.$filesizeEn.'"}';
    echo '{"Post":'.$outp.'}';
}