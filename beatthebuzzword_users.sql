-- phpMyAdmin SQL Dump
-- version 3.5.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Aug 16, 2013 at 11:14 AM
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
-- Table structure for table `beatthebuzzword_users`
--

CREATE TABLE IF NOT EXISTS `beatthebuzzword_users` (
  `id` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `picture` varchar(255) NOT NULL,
  `game_mode_1_score` int(11) NOT NULL DEFAULT '0',
  `game_mode_2_score` int(11) NOT NULL DEFAULT '0',
  `game_mode_3_score` int(11) NOT NULL DEFAULT '0',
  `game_mode_4_score` int(11) NOT NULL DEFAULT '0',
  `unlocked_cats` varchar(50) NOT NULL DEFAULT '1,',
  `game_mode_3` int(1) NOT NULL DEFAULT '0',
  `game_mode_4` int(1) NOT NULL DEFAULT '0',
  `achievement_1` int(1) NOT NULL DEFAULT '0',
  `achievement_2` int(1) NOT NULL DEFAULT '0',
  `achievement_3` int(1) NOT NULL DEFAULT '0',
  `achievement_4` int(1) NOT NULL DEFAULT '0',
  `achievement_5` int(1) NOT NULL DEFAULT '0',
  `achievement_6` int(1) NOT NULL DEFAULT '0',
  `achievement_7` int(1) NOT NULL DEFAULT '0',
  `achievement_8` int(1) NOT NULL DEFAULT '0',
  `achievement_9` int(1) NOT NULL DEFAULT '0',
  `badge_1` int(1) NOT NULL DEFAULT '0',
  `badge_2` int(1) NOT NULL DEFAULT '0',
  `badge_3` int(1) NOT NULL DEFAULT '0',
  `badge_4` int(1) NOT NULL DEFAULT '0',
  `badge_5` int(1) NOT NULL DEFAULT '0',
  `badge_6` int(1) NOT NULL DEFAULT '0',
  `badge_7` int(1) NOT NULL DEFAULT '0',
  `badge_8` int(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
