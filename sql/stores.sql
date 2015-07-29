-- phpMyAdmin SQL Dump
-- version 4.4.12
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jul 29, 2015 at 02:07 PM
-- Server version: 5.6.25
-- PHP Version: 5.6.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bookhive`
--

-- --------------------------------------------------------

--
-- Table structure for table `stores`
--

CREATE TABLE IF NOT EXISTS `stores` (
  `name` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `info` text NOT NULL,
  `phone` varchar(255) NOT NULL,
  `workingTime` text NOT NULL,
  `booksInStore` text NOT NULL,
  `latitude` double NOT NULL,
  `longitude` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='Holidng info about the bookstores.';

--
-- Dumping data for table `stores`
--

INSERT INTO `stores` (`name`, `city`, `info`, `phone`, `workingTime`, `booksInStore`, `latitude`, `longitude`) VALUES
('Booktrading, Sofiа', 'Sofia', 'Sofia, Graff Ignatiev str. 50; booktrading@book.com', '0882 907 212', 'Mon-Fri 08-19; Sat closed; Sun - closed', 'It;1984', 42.689295, 23.32759),
('Booktrading, Varna', 'Varna', 'Varna, bul. Vladislav Varnenchik 258; booktrading@book.com', '0886 418 559', 'Mon-Fri 08-19; Sat 10-17; Sun - closed', 'It', 43.2221833, 27.8766342),
('Penguins, Plovdiv', 'Plovdiv', 'Plovdiv, bul. Ruski 7; penguins@book.com', '070017661', 'Mon-Fri 08-19; Sat 10-17; Sun - closed', '1984;Green Mile', 42.147232, 24.751725);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
