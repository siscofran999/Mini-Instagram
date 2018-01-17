<?php
include "conn.php";
date_default_timezone_set("Asia/Jakarta");
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
$postdata = file_get_contents("php://input");

if(isset($_GET["limit"])){
	$limit      	= $_GET['limit'];
	$qu = "SELECT COUNT(*) as jml from posting";
	$re = $conn->query($qu);
	$riw = $re->fetch_assoc();
	if($riw['jml'] == 0){
		$kosong='tidak ada data';
		$outp = '{"kosong":"'.$kosong.'"}';
		echo '{"Maaf":'.$outp.'}';
	}else{

	$query_select = "SELECT * from posting order by waktu_post DESC LIMIT $limit";
	$result = $conn->query($query_select);
	$row = $result->fetch_All();
	$tables = '';
	$sekarang = new DateTime();
	foreach ($row as $rows) {
		if($tables != ""){$tables .= ",";}
		$waktuPost = $rows['5'];
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
		$id = $rows['1'];
		$sq = "SELECT nama_foto from user where id = '$id' ";
		$result = $conn->query($sq);
		$row = $result->fetch_assoc();
		$foto_profil = $row['nama_foto'];
		$idpost = $rows['0'];
		$sql = "SELECT count(id) as suka from suka where idpost = '$idpost' ";
		$results = $conn->query($sql);
		$raw = $results->fetch_assoc();
		$suka = $raw['suka'].' suka';
		$s = "SELECT count(id) as coment from komentar where idpost = '$idpost' ";
		$hasil = $conn->query($s);
		$rew = $hasil->fetch_assoc();
		$potong = substr($rows['3'], -5,1);
		if($potong == 'P'){
			$post = str_replace('fff', 'png', $rows['3']);
		}elseif($potong == 'B' ){
			$post = str_replace('fff', 'bmp', $rows['3']);
		}elseif($potong == 'J'){
			$post = str_replace('fff', 'jpeg', $rows['3']);
		}else{
			$post = str_replace('fff', 'pdf', $rows['3']);
		}
		$coment = $rew['coment'].' komentar';
		$tables .= '{"waktu":"'.$waktuSelisih.'",';
		$tables .= '"foto_profil":"'.$foto_profil.'",';
		$tables .= '"post":"'.$post.'",';
		$tables .= '"caption":"'.$rows['2'].'",';
		$tables .= '"idpost":"'.$rows['0'].'",';
		$tables .= '"suka":"'.$suka.'",';
		$tables .= '"coment":"'.$coment.'",';
		$tables .= '"id":"'.$rows['1'].'"}';
	}
	$data = '{"detail":['.$tables.']}';
	$hasil = '{"hasil":'.$data.'}';
	echo $hasil;
	}
} else if(isset($_GET['batas']) && isset($_GET['lastid'])){
	$limit      	= $_GET['batas'];
	$lastid			= $_GET['lastid'];
	$query_select = "SELECT * from posting where idpost < $lastid order by waktu_post DESC LIMIT $limit";
	$result = $conn->query($query_select);
	$row = $result->fetch_All();
	$tables = '';
	$sekarang = new DateTime();
	foreach ($row as $rows) {
		if($tables != ""){$tables .= ",";}
		$waktuPost = $rows['5'];
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
		$id = $rows['1'];
		$sq = "SELECT nama_foto from user where id = '$id' ";
		$result = $conn->query($sq);
		$row = $result->fetch_assoc();
		$foto_profil = $row['nama_foto'];
		$idpost = $rows['0'];
		$sql = "SELECT count(id) as suka from suka where idpost = '$idpost' ";
		$results = $conn->query($sql);
		$raw = $results->fetch_assoc();
		$suka = $raw['suka'].' suka';
		$s = "SELECT count(id) as coment from komentar where idpost = '$idpost' ";
		$hasil = $conn->query($s);
		$rew = $hasil->fetch_assoc();
		$potong = substr($rows['3'], -5,1);
		if($potong == 'P'){
			$post = str_replace('fff', 'png', $rows['3']);
		}elseif($potong == 'B' ){
			$post = str_replace('fff', 'bmp', $rows['3']);
		}else{
			$post = str_replace('fff', 'jpg', $rows['3']);
		}
		$coment = $rew['coment'].' komentar';
		$tables .= '{"waktu":"'.$waktuSelisih.'",';
		$tables .= '"foto_profil":"'.$foto_profil.'",';
		$tables .= '"post":"'.$post.'",';
		$tables .= '"caption":"'.$rows['2'].'",';
		$tables .= '"idpost":"'.$rows['0'].'",';
		$tables .= '"suka":"'.$suka.'",';
		$tables .= '"coment":"'.$coment.'",';
		$tables .= '"id":"'.$rows['1'].'"}';
	}
	$data = '{"detail":['.$tables.']}';
	$hasil = '{"hasil":'.$data.'}';
	echo $hasil;
}
?>