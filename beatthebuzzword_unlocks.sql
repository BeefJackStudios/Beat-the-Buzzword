-- phpMyAdmin SQL Dump
-- version 3.5.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Aug 15, 2013 at 04:51 PM
-- Server version: 5.5.25a
-- PHP Version: 5.4.4

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `beatthebuzzword`
--

-- --------------------------------------------------------

--
-- Table structure for table `beatthebuzzword_unlocks`
--

CREATE TABLE IF NOT EXISTS `beatthebuzzword_unlocks` (
  `playerId` varchar(50) NOT NULL,
  `achievements` varchar(50) NOT NULL,
  `badges` varchar(50) NOT NULL,
  `modes` varchar(50) NOT NULL,
  `score` int(11) NOT NULL,
  PRIMARY KEY (`playerId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `beatthebuzzword_unlocks`
--

INSERT INTO `beatthebuzzword_unlocks` (`playerId`, `achievements`, `badges`, `modes`, `score`) VALUES
('S49g5PzeK6', '1,2,', '0,', '0', 1000);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
