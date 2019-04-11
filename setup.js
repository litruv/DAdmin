var mysql = require('promise-mysql')
var fs = require('fs')

var dbconfig;
fs.readFile('dbconfig.json', 'utf8', function (err, data) {
    if (err) {
        if (err.code == "ENOENT") {
            console.error("Copy dbconfig.template.json to dbconfig.json and edit first")
            //    process.exit()
        }
        console.error(err)
        process.exit()
    }
    else {
        dbconfig = JSON.parse(data);
    }
    var setupconfig;
    fs.readFile('setup.json', 'utf8', function (err, data) {

        if (err) {
            if (err.code == "ENOENT") {
                console.error("Copy setup.template.json to setup.json and edit first")
                //        process.exit()
            }
            console.error(err)
            process.exit()
        }
        else {
            setupconfig = JSON.parse(data);
        }

        mysql.createConnection({
            user: dbconfig.mysql_user,
            password: dbconfig.mysql_password,
            host: dbconfig.mysql_host,
            database: dbconfig.mysql_db
        }).then(conn => {
            conn.query("CREATE TABLE IF NOT EXISTS `servers` (  `AI_ID` int(11) unsigned NOT NULL AUTO_INCREMENT,  `ServerID` varchar(20) NOT NULL DEFAULT '0',  `ServerName` varchar(100) NOT NULL DEFAULT '0',  `ServerIcon` varchar(200) DEFAULT '0',  PRIMARY KEY (`AI_ID`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;")
            conn.query("CREATE TABLE IF NOT EXISTS `settings` (  `AI_ID` int(11) NOT NULL AUTO_INCREMENT,  `setting` varchar(50) NOT NULL DEFAULT '0',  `value` varchar(200) NOT NULL DEFAULT '0',  `serverID` varchar(20) DEFAULT '0',  PRIMARY KEY (`AI_ID`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;")
            conn.query("CREATE TABLE IF NOT EXISTS `users` (  `AI_ID` int(11) NOT NULL AUTO_INCREMENT,  `ID` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,  `username` longtext COLLATE utf8mb4_unicode_ci NOT NULL,  `avatarURL` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,  `joined` bigint(20) NOT NULL,  `bot` tinyint(1) NOT NULL DEFAULT '0',  `discriminator` varchar(4) COLLATE utf8mb4_unicode_ci NOT NULL,  `serverID` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,  `usedCommands` int(10) unsigned DEFAULT '0',  PRIMARY KEY (`AI_ID`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;")
            return conn;
        }).then((conn) => {
            conn.query("DELETE FROM `settings` WHERE `setting` = 'token'")
            conn.query("DELETE FROM `settings` WHERE `setting` = 'botOwner'")
            return conn;
        }).then((conn) => {
            conn.query("INSERT INTO `settings` (`setting`, `value`) VALUES ('token', '" + setupconfig.bot_token + "')")
            conn.query("INSERT INTO `settings` (`setting`, `value`) VALUES ('botOwner', '" + setupconfig.bot_owner + "')")
        })

        console.log("Database configured! setup.json is no longer required.\nDocker build next")
        process.exit(0)
    });
});

