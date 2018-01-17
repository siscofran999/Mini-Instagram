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
	$request 	= json_decode($postdata);
    $idpost     = $request->idpost;

    if($idpost != null){
		$query_select = "SELECT user.id, coment, waktu_coment , nama_foto from komentar, user where komentar.idpost = '$idpost' 
						and user.id = komentar.id order by waktu_coment";
		$result = $conn->query($query_select);
		$row = $result->fetch_All();
		$tables = '';
		$sekarang = new DateTime();
		foreach ($row as $rows) {
			if($tables != ""){$tables .= ",";}
			$waktuComent = $rows['2'];
			$waktuComent = new DateTime($waktuComent);
			$selisih = $sekarang->diff($waktuComent);
			
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
			$tables .= '{"foto_profil":"'.$rows['3'].'",';
			$tables .= '"waktu_coment":"'.$waktuSelisih.'",';
			$tables .= '"coment":"'.$rows['1'].'",';
			$tables .= '"idcoment":"'.$rows['0'].'"}';
		}
		$data = '{"detail":['.$tables.']}';
		$hasil = '{"hasil":'.$data.'}';
		echo $hasil;
    }else{
    	echo "gagal";
    }
	
}
?>