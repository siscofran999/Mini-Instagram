<?php
  // buat koneksi dengan database
  $conn = new mysqli('localhost','root','','tugas_akhir');
  
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>