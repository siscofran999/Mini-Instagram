<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
date_default_timezone_set("Asia/Jakarta");
include "conn.php";
$IP 		= getHostByName(getHostName());
$tgl 		= date("Ymd");
$api 		= sha1("ip" . $IP. md5($tgl) . "IP");
$outp = '{"apa_ini":"'.$api.'"}';
$data = '{"hayo_tebak":'.$outp.'}';
echo $data;
		
?>