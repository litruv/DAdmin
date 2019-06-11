const mysql = require('mysql')
const fs = require('fs')


var connection

module.exports = {
    checkguilds: (discordclient) => {
        discordclient.guilds.forEach(guild => {
            check_guild_exists(discordclient, guild.id).then((r) => {
                console.log(r);
                console.log(guild.name);
            });

            this.checkusers(discordclient, guild);
        });
    },

    get_setting: (settingname, guildID = 0) => {
        return new Promise((resolve, reject) => {
            readSetting(settingname, guildID).then((settingreturn) => {
                resolve(settingreturn.value);
            }).catch(err => {
                reject(console.error(`Error: with settingname '${settingname}' on Guild ${guildID} ` + err))
            })
        })

    },

    set_setting: (guildID, settingname, value) => {
        writeSetting(settingname, value, guildID);
    },

    connect: () => {
        return new Promise((resolve, reject) => {
            readConfig('dbconfig.json')
                .then(config => {
                    resolve(dbConnect(config))
                })
        })
    }
}

function readConfig(configFile, formatting = 'utf8') {
    return new Promise((resolve, reject) => {
        fs.readFile(configFile, formatting, function (err, data) {
            if (err) {
                if (err.code == "ENOENT") {
                    console.error("Copy dbconfig.template.json to dbconfig.json and edit first")
                    reject(`Error reading config file ${configFile} (${formatting})`)
                    //    process.exit()
                }
                reject(`Other Error reading config file ${configFile} (${formatting} - ${err})`)
            }
            else {
                if (!JSON.parse(data))
                    reject('Error parsing config file, invalid JSON')
                let dbsettings = JSON.parse(data)

                dbsettings.user = dbsettings.mysql_user
                dbsettings.host = dbsettings.mysql_host
                dbsettings.password = dbsettings.mysql_password
                dbsettings.database = dbsettings.mysql_db

                resolve(dbsettings)
            }
        });
    })
}

function writeSetting(settingName, settingValue, guildId = 0) {
    return new Promise((resolve, reject) => {
        setTimeout(reject, 1000, new Error("Didn't write something within a second"))

        connection.query(`SELECT * FROM settings WHERE setting='${settingName}' AND serverID='${guildId}'`,
            function (error, results, fields) {
                if (results.length > 0) {
                    //console.log(`UPDATE settings SET value=${settingValue} WHERE setting=${settingName} AND serverID=${guildId}`)
                    connection.query(`UPDATE settings SET value= ? WHERE setting= ? AND serverID= ?`, [settingValue, settingName, guildId],
                        function (error, results, fields) {
                            if (error)
                                reject(error)
                            resolve(results)
                        })
                }
                else {
                    connection.query(`INSERT INTO settings (setting, value, serverID) VALUES ('${settingName}', '${settingValue}', '${guildId}')`,
                        function (error, results, fields) {
                            if (error)
                                reject(error)
                            resolve(results)
                        })

                }
            })

    })
}

function readSetting(settingName, guildId = 0) {
    return new Promise((resolve, reject) => {
        setTimeout(reject, 1000, new Error("Didn't read something within a second"))

        connection.query(`SELECT * FROM settings WHERE setting='${settingName}' AND serverID='${guildId}'`,
            function (error, results, fields) {
                if (error)
                    reject(error)
                //console.log(results)
                resolve(results[0])
            })
    })
}

function deleteSetting(settingName, guildId = 0) {
    return new Promise((resolve, reject) => {
        setTimeout(reject, 1000, new Error("Didn't delete something within a second"))

        connection.query(`DELETE FROM settings WHERE setting='${settingName}' AND serverID='${guildId}'`,
            function (error, results, fields) {
                if (error)
                    reject(error)
                resolve(results)
            })
    })
}

function dbConnect(config) {
    return new Promise((resolve, reject) => {
        let conn = mysql.createConnection(config)

        conn.connect(error => {
            if (error)
                reject("Couldn't connect to db" + error)
            connection = conn;
            resolve(conn)
        })
    })
}

function closeConnection() {
    connection.end()
}