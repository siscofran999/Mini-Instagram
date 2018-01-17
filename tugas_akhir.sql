-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 29 Des 2017 pada 02.30
-- Versi Server: 10.1.16-MariaDB
-- PHP Version: 5.5.38

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tugas_akhir`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `komentar`
--

CREATE TABLE `komentar` (
  `idpost` int(11) NOT NULL,
  `id` varchar(50) NOT NULL,
  `coment` varchar(100) NOT NULL,
  `waktu_coment` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `komentar`
--

INSERT INTO `komentar` (`idpost`, `id`, `coment`, `waktu_coment`) VALUES
(15, 'SiscoFran', 'Berisi', '2017-12-22 13:30:49'),
(15, 'SiscoFran', 'wew', '2017-12-22 13:31:26'),
(15, 'Rahman', 'hi sisco inget gue gak??', '2017-12-22 18:28:16');

-- --------------------------------------------------------

--
-- Struktur dari tabel `posting`
--

CREATE TABLE `posting` (
  `idpost` int(11) NOT NULL,
  `id` varchar(50) NOT NULL,
  `caption` varchar(5000) NOT NULL,
  `post` varchar(300) NOT NULL,
  `post_pdf` varchar(300) NOT NULL,
  `waktu_post` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `posting`
--

INSERT INTO `posting` (`idpost`, `id`, `caption`, `post`, `post_pdf`, `waktu_post`) VALUES
(1, 'SiscoFran', 'Keren', 'Foto/postSiscoFran1B.fff', '', '2017-12-20 22:40:59'),
(2, 'SiscoFran', 'Nih ada file pdf', 'Foto/thumbnailSiscoFran2.jpg', 'PDF/postSiscoFran2.fff', '2017-12-21 10:03:46'),
(4, 'SiscoFran', 'wew', 'Foto/postSiscoFran4B.fff', '', '2017-12-21 12:41:24'),
(6, 'SiscoFran', 'wqeqw', 'Foto/postSiscoFran6B.fff', '', '2017-12-21 12:48:01'),
(7, 'SiscoFran', 'kere', 'Foto/postSiscoFran7P.fff', '', '2017-12-21 12:55:59'),
(8, 'SiscoFran', 'keren', 'Foto/postSiscoFran8J.fff', '', '2017-12-21 13:14:15'),
(9, 'SiscoFran', 'ehhehe', 'Foto/postSiscoFran9B.fff', '', '2017-12-21 13:58:46'),
(10, 'SiscoFran', 'Ada jurnal bro', 'Foto/thumbnailSiscoFran10.jpg', 'PDF/postSiscoFran10.fff', '2017-12-21 13:59:38'),
(11, 'SiscoFran', 'Kerenasdas', 'Foto/postSiscoFran11J.fff', '', '2017-12-21 14:00:25'),
(12, 'SiscoFran', 'asdasadasfsdgfgdf', 'Foto/postSiscoFran12P.fff', '', '2017-12-21 14:01:05'),
(13, 'SiscoFran', 'sfsfsfsddhfgj', 'Foto/postSiscoFran13J.fff', '', '2017-12-21 14:02:16'),
(14, 'SiscoFran', 'Keren', 'Foto/postSiscoFran14J.fff', '', '2017-12-21 14:03:20'),
(15, 'SiscoFran', 'sdasa', 'Foto/postSiscoFran15J.fff', '', '2017-12-21 14:18:35');

-- --------------------------------------------------------

--
-- Struktur dari tabel `suka`
--

CREATE TABLE `suka` (
  `idpost` int(11) NOT NULL,
  `id` varchar(50) NOT NULL,
  `waktu_like` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `suka`
--

INSERT INTO `suka` (`idpost`, `id`, `waktu_like`) VALUES
(15, 'SiscoFran', '2017-12-26 17:09:21');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `id` varchar(50) NOT NULL,
  `nama` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `nama_foto` varchar(100) NOT NULL,
  `link` varchar(100) NOT NULL,
  `bio` varchar(300) NOT NULL,
  `password` varchar(100) NOT NULL,
  `konfpassword` varchar(100) NOT NULL,
  `IP` varchar(20) NOT NULL,
  `TglRegister` datetime NOT NULL,
  `Lastlogin` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`id`, `nama`, `email`, `nama_foto`, `link`, `bio`, `password`, `konfpassword`, `IP`, `TglRegister`, `Lastlogin`) VALUES
('ikbal', 'M.Rahman', 'rahman@gmail.com', 'Foto/1504598234ikbal.jpg', 'anichans.web.id', 'android dev, php dev', 'f31fdae13f03c5022f16a1828df787a3', 'f31fdae13f03c5022f16a1828df787a3', '192.168.12.54', '2017-08-25 10:11:53', '2017-11-30 09:58:16'),
('Rahman', 'M.Rahman', 'rahman@gmail.com', 'Foto/1513941981Rahman.jpg', 'anichans.web.id', 'android dev, php dev', 'f31fdae13f03c5022f16a1828df787a3', 'f31fdae13f03c5022f16a1828df787a3', '192.168.137.1', '2017-12-22 18:23:36', '2017-12-24 16:42:07'),
('Saya', 'NamaSaya', 'saya@gmail.com', 'Foto/1512809078Saya.jpg', '', '', 'f83e2a30daabad7e64d83539daf8b99e', 'f83e2a30daabad7e64d83539daf8b99e', '127.0.0.1', '2017-12-09 13:25:28', '2017-12-09 15:44:26'),
('SiscoFran', 'Fransisco', 'siscofran999@gmail.com', 'Foto/1513924369SiscoFran.jpg', 'anichans.web.id', 'keteka yaketeku', 'f83e2a30daabad7e64d83539daf8b99e', 'f83e2a30daabad7e64d83539daf8b99e', '192.168.12.54', '2017-08-30 08:32:22', '2017-12-26 17:09:07');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `komentar`
--
ALTER TABLE `komentar`
  ADD KEY `id` (`id`),
  ADD KEY `idpost` (`idpost`);

--
-- Indexes for table `posting`
--
ALTER TABLE `posting`
  ADD PRIMARY KEY (`idpost`),
  ADD KEY `id` (`id`);

--
-- Indexes for table `suka`
--
ALTER TABLE `suka`
  ADD KEY `id` (`id`),
  ADD KEY `idpost` (`idpost`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `komentar`
--
ALTER TABLE `komentar`
  ADD CONSTRAINT `komentar_ibfk_2` FOREIGN KEY (`id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `komentar_ibfk_3` FOREIGN KEY (`idpost`) REFERENCES `posting` (`idpost`);

--
-- Ketidakleluasaan untuk tabel `posting`
--
ALTER TABLE `posting`
  ADD CONSTRAINT `posting_ibfk_1` FOREIGN KEY (`id`) REFERENCES `user` (`id`);

--
-- Ketidakleluasaan untuk tabel `suka`
--
ALTER TABLE `suka`
  ADD CONSTRAINT `suka_ibfk_1` FOREIGN KEY (`id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `suka_ibfk_2` FOREIGN KEY (`idpost`) REFERENCES `posting` (`idpost`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
