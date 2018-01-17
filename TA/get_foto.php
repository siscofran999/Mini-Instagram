<?php
include "conn.php";

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
$postdata = file_get_contents("php://input");
if (isset($_GET['id']) && isset($_GET['nama'])) {
    $id         = $_GET['id'];
    $nama       = $_GET['nama'];
    $query_select = "SELECT nama_foto,link,bio from user where Id='$id' and Nama='$nama' ";
    $result = $conn->query($query_select);
    $row = $result->fetch_assoc();
    $get_foto = $row['nama_foto'];
    $link = $row['link'];
    $bio = $row['bio'];
    $outp = '';
    $outp .= '{"Dapetfoto":"'.$get_foto.'",';
    $outp .= '"link":"'.$link.'",';
    $outp .= '"bio":"'.$bio.'"}';
    echo '{"Berhasil":'.$outp.'}';
}else if(isset($_GET['idTemen']) && isset($_GET['fotoTemen'])){
    $id         = $_GET['idTemen'];
    $foto       = $_GET['fotoTemen'];
    $query_select = "SELECT nama,link,bio from user where Id='$id' and nama_foto='$foto' ";
    $result = $conn->query($query_select);
    $row = $result->fetch_assoc();
    $nama = $row['nama'];
    $link = $row['link'];
    $bio = $row['bio'];
    $outp = '';
    $outp .= '{"nama":"'.$nama.'",';
    $outp .= '"link":"'.$link.'",';
    $outp .= '"bio":"'.$bio.'"}';
    echo '{"Berhasil":'.$outp.'}';
}