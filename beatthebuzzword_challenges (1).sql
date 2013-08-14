-- phpMyAdmin SQL Dump
-- version 3.3.10.4
-- http://www.phpmyadmin.net
--
-- Host: mysql.berthasworkers.com
-- Generation Time: Aug 12, 2013 at 03:13 AM
-- Server version: 5.1.56
-- PHP Version: 5.2.17

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `bertha`
--

-- --------------------------------------------------------

--
-- Table structure for table `beatthebuzzword_challenges`
--

CREATE TABLE IF NOT EXISTS `beatthebuzzword_challenges` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `user` char(64) DEFAULT NULL,
  `gameId` char(64) NOT NULL,
  `genre` char(64) NOT NULL,
  `category` char(64) NOT NULL,
  `playerId` char(64) NOT NULL,
  `answers` char(64) NOT NULL,
  `score` char(64) NOT NULL,
  `correct` char(64) NOT NULL,
  `incorrect` char(64) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=113 ;

--
-- Dumping data for table `beatthebuzzword_challenges`
--

INSERT INTO `beatthebuzzword_challenges` (`id`, `user`, `gameId`, `genre`, `category`, `playerId`, `answers`, `score`, `correct`, `incorrect`) VALUES
(105, '1', '105', 'Innovation', 'Head 2 Head', 'fuIEUKhLBK', '237,219,218,227,231,224,211,206,245,232,235,202,205,203,215,204,', '25', '0', '5'),
(106, '2', '105', 'Innovation', 'Head 2 Head', 'ZpszIAy6KL', '237,219,218,227,231,224,211,206,245,232,235,202,205,203,215,204,', '25', '1', '4'),
(107, '1', '107', 'HR', 'Head 2 Head', 'ZpszIAy6KL', '32,69,19,1,52,28,40,20,75,37,31,54,44,21,3,13,4,36,43,39,5,35,12', '25', '1', '4'),
(108, '2', '107', 'HR', 'Head 2 Head', 'fuIEUKhLBK', '', '', '', ''),
(109, '1', '109', 'HR', 'Head 2 Head', 'ZpszIAy6KL', '63,21,22,37,46,54,26,70,6,24,50,36,68,3,32,53,38,39,15,30,57,31,', '25', '0', '5'),
(110, '2', '109', 'HR', 'Head 2 Head', 'Jc2LNzlEHt', '', '', '', ''),
(103, '1', '103', 'HR', 'Head 2 Head', 'wVo7Qcpo0I', '57,9,8,11,17,38,33,19,53,15,52,25,26,1,68,71,30,75,7,4,61,34,10,', '10', '0', '2'),
(104, '2', '103', 'HR', 'Head 2 Head', 'ZpszIAy6KL', '57,9,8,11,17,38,33,19,53,15,52,25,26,1,68,71,30,75,7,4,61,34,10,', '10', '0', '2'),
(72, '2', '71', 'HR', 'CEO', '2Wh9iuAK0-', '', '', '', ''),
(71, '1', '71', 'HR', 'CEO', 'ZpszIAy6KL', '2', '10', '1', '1'),
(70, '2', '69', 'HR', 'CEO', 'OEirIgOf6m', '', '', '', ''),
(69, '1', '69', 'HR', 'CEO', 'NHcjWMhSbg', '2', '10', '0', '2'),
(68, '2', '67', 'HR', 'CEO', 'atV6EznkHW', '', '', '', ''),
(67, '1', '67', 'HR', 'CEO', 'NHcjWMhSbg', '2', '10', '2', '0'),
(66, '2', '65', 'HR', 'CEO', 'OEirIgOf6m', '', '', '', ''),
(65, '1', '65', 'HR', 'CEO', 'NHcjWMhSbg', '2', '10', '1', '1'),
(64, '2', '63', 'HR', 'CEO', 'tM-P24RY3l', '', '', '', ''),
(63, '1', '63', 'HR', 'CEO', 'ZpszIAy6KL', '2', '10', '1', '1'),
(62, '2', '61', 'HR', 'CEO', 'undefined', '', '', '', ''),
(61, '1', '61', 'HR', 'CEO', 'ZpszIAy6KL', '2', '10', '1', '1'),
(58, '2', '57', 'HR', 'CEO', '2', '', '', '', ''),
(57, '1', '57', 'HR', 'CEO', 'ZpszIAy6KL', '2', '10', '0', '2'),
(56, '2', '55', 'HR', 'CEO', '2', '', '', '', ''),
(55, '1', '55', 'HR', 'CEO', 'ZpszIAy6KL', '3', '15', '0', '3'),
(60, '2', '59', 'HR', 'CEO', '2', '', '', '', ''),
(59, '1', '59', 'HR', 'CEO', 'ZpszIAy6KL', '2', '15', '2', '0'),
(54, '2', '53', 'HR', 'CEO', '2', '', '', '', ''),
(53, '1', '53', 'HR', 'CEO', 'ZpszIAy6KL', '2', '10', '0', '2'),
(111, '1', '111', 'Innovation', 'Head 2 Head', 'N9IqeIebx0', '211,210,218,245,216,205,231,224,209,223,235,239,219,214,221,203,', '100', '3', '7'),
(112, '2', '111', 'Innovation', 'Head 2 Head', 'vA5mvQZdRa', '', '', '', '');
