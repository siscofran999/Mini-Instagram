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
	$query_select = "SELECT post from posting where Id='$id' order by waktu_post DESC";
	$result = $conn->query($query_select);
	$row = $result->fetch_All();
	$tables = '';
	foreach ($row as $rows) {
		if($tables != ""){$tables .= ",";}
		$potong = substr($rows['0'], -5,1);
		if($potong == 'P'){
			$post = str_replace('fff', 'png', $rows['0']);
		}elseif($potong == 'B' ){
			$post = str_replace('fff', 'bmp', $rows['0']);
		}else{
			$post = str_replace('fff', 'jpeg', $rows['0']);
		}
		$tables .= '{"post":"'.$post.'"}';
	}
	$data = '{"detail":['.$tables.']}';
	$hasil = '{"hasil":'.$data.'}';
	echo $hasil;
}
?>