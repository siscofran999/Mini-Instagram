<?php
include "conn.php";

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
    $id         = $request->id;
    $postItem   = $request->postItem;
    $potong = substr($postItem, -3,3);
        if($potong == 'png'){
            $postItem = str_replace('png', 'fff', $postItem);
        }elseif($potong == 'bmp' ){
            $postItem = str_replace('bmp', 'fff', $postItem);
        }elseif($potong == 'fff'){
            $postItem = str_replace('fff', 'jpg', $postItem);
        }else{
            $postItem = str_replace('jpeg', 'fff', $postItem);
        }
    $query_select = "SELECT * from posting where id='$id' and post='$postItem' ";
    $result = $conn->query($query_select);
    $row = $result->fetch_All();
    $waktuPost = $row['0']['5'];
    $tables = '';
    $sekarang = new DateTime();
    $waktuPost = new DateTime($waktuPost);
    $selisih = $sekarang->diff($waktuPost);
    if($selisih->y != 0){
        $waktuSelisih = $selisih->y.' tahun';
    }else if($selisih->m != 0 ){
        $waktuSelisih = $selisih->m.' bulan';
    }else if($selisih->d != 0 ){
        $waktuSelisih = $selisih->d.' hari';
    }else if($selisih->h != 0 ){
        $waktuSelisih = $selisih->h.' jam';
    }else if($selisih->i != 0 ){
        $waktuSelisih = $selisih->i.' menit';
    }else if($selisih->s != 0 ){
        $waktuSelisih = $selisih->s.' detik';
    }
    $id = $row['0']['1'];
    $sq = "SELECT nama_foto from user where id = '$id' ";
    $result = $conn->query($sq);
    $rows = $result->fetch_assoc();
    $foto_profil = $rows['nama_foto'];
    $idpost = $row['0']['0'];
    $sql = "SELECT count(id) as suka from suka where idpost = '$idpost' ";
    $results = $conn->query($sql);
    $raw = $results->fetch_assoc();
    $suka = $raw['suka'].' suka';
    $s = "SELECT count(id) as coment from komentar where idpost = '$idpost' ";
    $hasil = $conn->query($s);
    $rew = $hasil->fetch_assoc();
    $potong = substr($row['0']['3'], -5,1);
        if($potong == 'P'){
            $post = str_replace('fff', 'png', $row['0']['3']);
        }elseif($potong == 'B' ){
            $post = str_replace('fff', 'bmp', $row['0']['3']);
        }elseif($potong == 'J'){
            $post = str_replace('fff', 'jpeg', $row['0']['3']);
        }else{
            $post = str_replace('fff', 'jpg', $row['0']['3']);
        }
    $coment = $rew['coment'].' komentar';
    $tables .= '{"waktu":"'.$waktuSelisih.'",';
    $tables .= '"foto_profil":"'.$foto_profil.'",';
    $tables .= '"post":"'.$post.'",';
    $tables .= '"caption":"'.$row['0']['2'].'",';
    $tables .= '"idpost":"'.$row['0']['0'].'",';
    $tables .= '"suka":"'.$suka.'",';
    $tables .= '"coment":"'.$coment.'",';
    $tables .= '"id":"'.$row['0']['1'].'"}';

    $hasil = '{"post":'.$tables.'}';
    echo $hasil;
}