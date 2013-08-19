-- phpMyAdmin SQL Dump
-- version 3.5.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Aug 19, 2013 at 01:17 PM
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
-- Table structure for table `beatthebuzzword_questions`
--

CREATE TABLE IF NOT EXISTS `beatthebuzzword_questions` (
  `question` varchar(50) NOT NULL,
  `player_id` varchar(50) NOT NULL,
  `category` varchar(50) NOT NULL,
  `score` int(11) NOT NULL DEFAULT '0',
  `genre` varchar(50) NOT NULL,
  PRIMARY KEY (`question`,`player_id`,`category`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
