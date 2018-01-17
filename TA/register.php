<?php
include "conn.php";
date_default_timezone_set("Asia/Jakarta");
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
$postdata = file_get_contents("php://input");
if(isset($_GET["id"]) && isset($_GET['nama']) && isset($_GET['email']) && isset($_GET['pass']) && isset($_GET['konfpass'])){
	if(!empty($_GET["id"]) && !empty($_GET["nama"]) && !empty($_GET["email"]) && !empty($_GET["pass"]) && !empty($_GET["konfpass"])){
		$id      	= $_GET['id'];
		$nama	 	= $_GET['nama'];
		$email	 	= $_GET['email'];
		$pass	 	= $_GET['pass'];
		$konfpass	= $_GET['konfpass'];
		$key		= "Pr06r4mM3R";
		$time   	= date("Y/m/d H:i:s");
		//$IP     	= getRealIP();
		$IP 		= getHostByName(getHostName());
		$pass 		= md5(md5($pass).$key);
		$konfpass	= md5(md5($konfpass).$key);
		$outp = "";
		$tgl 		= date("Ymd");
		$api 		= sha1("ip" . $IP. md5($tgl) . "IP"); // ini untuk apinya waktu 1 hari karena sesuai date Ymd
		if($pass != $konfpass){
			$kosong='tidak cocok';
			$outp .= '{"pass":"'.$kosong.'"}';
			echo '{"Maaf":'.$outp.'}';
		}else{
			$sq = "SELECT count(*) as ID from user where id = '$id'";
			$result = $conn->query($sq);
			$row = $result->fetch_assoc();
	  		$jml = $row['ID'];
	  		if($jml > 0){
	  			$kosong='Sudah ada';
				$outp .= '{"id":"'.$kosong.'"}';
				echo '{"Maaf":'.$outp.'}';
	  		}else{
	  			$query = "INSERT into user(id,nama,email,password,konfpassword,IP,TglRegister) 
				values('$id','$nama','$email','$pass','$konfpass','$IP','$time') ";
				$conn->query($query);
				$outp .= '{"id":"'.$api.'"}';
				echo '{"Yes":'.$outp.'}';
	  		}
		}
	}
}