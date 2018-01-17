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
    $id        = $request->id;
    $caption   = $request->caption;
    $post      = $request->post;
    $data_pdf  = base64_decode($post);
    $time      = date("Y/m/d H:i:s");
    $waktu     = time();
    $nama_pdf  = 'post'.$waktu.$id.'.pdf'; // simpan file pdf
    $direct    = 'PDF/'.$nama_pdf;
    $foto      = file_put_contents($direct, $data_pdf);

    $im = new imagick(__DIR__ . DIRECTORY_SEPARATOR .$direct.'[0]'); // simpan thumbnail pdf
    $im->setImageFormat('jpg');
    header('Content-Type: image/jpeg');
    $waktu      = time();
    $nama_foto  = 'thumbnail'.$waktu.$id.'.jpg';
    $direct2    = 'Foto/'.$nama_foto;
    $foto       = file_put_contents($direct2, $im);
    $sql = "SELECT max(idpost) as idpost from posting";    
    $result = $conn->query($sql);
    $row = $result->fetch_assoc();
    $idpost = $row['idpost'];
    if($row['idpost'] == 0){
        $idpost = 1;
    }else{
        $idpost = $row['idpost']+1;
    }

    $query     = "INSERT into posting(idpost,id,caption,post,post_pdf,waktu_post) 
                values('$idpost','$id','$caption','$direct2','$direct','$time') ";
                $conn->query($query);
    $kosong='hore';
    $outp = '{"berhasil":"'.$kosong.'"}';
    echo '{"Post_pdf":'.$outp.'}';
    
}