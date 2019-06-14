-- --------------------------------------------------------
-- Host:                         litruv.com
-- Server version:               5.7.26-0ubuntu0.18.04.1 - (Ubuntu)
-- Server OS:                    Linux
-- HeidiSQL Version:             10.1.0.5464
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for DAdmin
CREATE DATABASE IF NOT EXISTS `DAdmin` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `DAdmin`;

-- Dumping structure for table DAdmin.servers
CREATE TABLE IF NOT EXISTS `servers` (
  `AI_ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `ServerID` varchar(20) NOT NULL DEFAULT '0',
  `ServerName` varchar(100) NOT NULL DEFAULT '0',
  `ServerIcon` varchar(200) DEFAULT '0',
  PRIMARY KEY (`AI_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.
-- Dumping structure for table DAdmin.settings
CREATE TABLE IF NOT EXISTS `settings` (
  `AI_ID` int(11) NOT NULL AUTO_INCREMENT,
  `setting` varchar(50) NOT NULL DEFAULT '0',
  `value` longtext NOT NULL,
  `serverID` varchar(20) DEFAULT '0',
  PRIMARY KEY (`AI_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2893 DEFAULT CHARSET=utf8mb4;

-- Data exporting was unselected.
-- Dumping structure for table DAdmin.users
CREATE TABLE IF NOT EXISTS `users` (
  `AI_ID` int(11) NOT NULL AUTO_INCREMENT,
  `ID` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `avatarURL` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `joined` bigint(20) NOT NULL,
  `bot` tinyint(1) NOT NULL DEFAULT '0',
  `discriminator` varchar(4) COLLATE utf8mb4_unicode_ci NOT NULL,
  `serverID` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `usedCommands` int(10) unsigned DEFAULT '0',
  PRIMARY KEY (`AI_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Data exporting was unselected.
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
