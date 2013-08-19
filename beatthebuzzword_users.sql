-- phpMyAdmin SQL Dump
-- version 3.5.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Aug 18, 2013 at 09:44 PM
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
  `player_id` varchar(50) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `picture` varchar(255) NOT NULL,
  `game_1_score` int(11) NOT NULL DEFAULT '0',
  `game_2_score` int(11) NOT NULL DEFAULT '0',
  `game_3_score` int(11) NOT NULL DEFAULT '0',
  `game_4_score` int(11) NOT NULL DEFAULT '0',
  `unlocked_cats` varchar(50) NOT NULL DEFAULT '1,',
  `last_play_time` int(11) NOT NULL DEFAULT '0',
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
  PRIMARY KEY (`player_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `beatthebuzzword_users`
--

INSERT INTO `beatthebuzzword_users` (`player_id`, `first_name`, `last_name`, `picture`, `game_1_score`, `game_2_score`, `game_3_score`, `game_4_score`, `unlocked_cats`, `last_play_time`, `achievement_1`, `achievement_2`, `achievement_3`, `achievement_4`, `achievement_5`, `achievement_6`, `achievement_7`, `achievement_8`, `achievement_9`, `badge_1`, `badge_2`, `badge_3`, `badge_4`, `badge_5`, `badge_6`, `badge_7`, `badge_8`) VALUES
('S49g5PzeK6', 'Farhad', 'Poorsolaymani', 'http://m.c.lnkd.licdn.com/mpr/mprx/0_Z3_74LI-gCffNtau9X3p4QJPl8e7qNxus6Br4bW2m6yxIre2qFP_nFjGxSHKBPY8MGTlchBkSV9f', 0, 0, 0, 0, '1,', 1376854706, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
