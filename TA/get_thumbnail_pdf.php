<?php
date_default_timezone_set("Asia/Jakarta");
$im = new imagick(__DIR__ . DIRECTORY_SEPARATOR .'PDF\post1506350179SiscoFran.pdf[0]');
$im->setImageFormat('jpg');
header('Content-Type: image/jpeg');
$waktu      = time();
$nama_foto  = 'thumbnail'.$waktu.$id.'.jpg';
$direct     = 'Foto/'.$nama_foto;
$foto       = file_put_contents($direct, $im);
//$dir = 'C:\xampp\htdocs\TA';
//echo shell_exec($dir.'\magick post1506423905SiscoFran.pdf test.jpg');

?>