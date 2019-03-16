var mysql = require('mysql');
var config = require('./dbconfig.json');

module.exports = {
    checkguilds: function (discordclient) {
        discordclient.guilds.forEach(guild => {
            check_guild_exists(discordclient, guild.id).then((r) => {
                console.log(r);
                console.log(guild.name);
            });

            this.checkusers(discordclient, guild);
        });
    },

    checkusers: async function (client, guild) {
        await guild.members.forEach(member => {
            check_user_exists(client, member.id, guild.id);
        });
    },

    get_setting: async function (settingname, guildID=0) {
        
        var settingreturn = await sql_q(settingname, guildID);
        return settingreturn[0].value;
    },

    set_setting: async function (guildID, settingname, value) {
        sql_qs(guildID, settingname, value);
    },

    connect: async function () {
        this.con = await connecttodb();
    },

    user_add_command(userid, guildID) {
        increment_user_commands(userid, guildID);
    }
};

function connecttodb() {
    new Promise(resolve => {
        this.con = mysql.createConnection({
            host: config.mysql_host,
            user: config.mysql_user,
            password: config.mysql_password,
            database: config.mysql_db,
            charset: "utf8mb4_unicode_ci"
        });

        resolve(this.con);
    });
}
async function check_user_exists(client, userid, guildid) {
    var exists = await sql_user(client, userid, guildid);
    return exists[0];
}

function sql_user(client, userid, guildid) {
    return new Promise(resolve => {
        con.query("SELECT AI_ID FROM users WHERE ID = '" + userid + "'", function (err, result, fields) {
            if (err) throw err;

            var user = client.guilds.get(guildid).members.get(userid);
            var username = user.displayName;
            var usericon = user.user.avatarURL;
            var bot = user.user.bot;
            var discriminator = user.user.discriminator;
            var actualusername = user.user.username;

            if (result.length == 0)
                var sql = `INSERT INTO users (ID, name, username, avatarURL, bot, discriminator, serverID, joined) VALUES (${con.escape(userid)}, ${con.escape(username)}, ${con.escape(actualusername)}, ${con.escape(usericon)}, ${con.escape(bot)}, ${con.escape(discriminator)}, ${con.escape(guildid)}, ${con.escape(user.joinedTimestamp)});`;

            else
                var sql = `UPDATE users SET name=${con.escape(username)}, avatarURL=${con.escape(usericon)}, discriminator=${con.escape(discriminator)} WHERE (ID=${con.escape(userid)} AND serverID=${con.escape(guildid)});`;

            con.query(sql, function (err, result) {
                if (err) throw err;
            });
        });
    });
}

function sql_guild(client, guildid) {
    return new Promise(resolve => {
        con.query("SELECT AI_ID FROM servers WHERE ServerID = '" + guildid + "'", function (err, result, fields) {
            if (err) throw err;
            if (result.length == 0) {
                var guild = client.guilds.get(guildid);
                var guildname = guild.name;
                var guildicon = guild.iconURL;

                if (guildname != null) {
                    var sql = "INSERT INTO `servers` (`ServerID`, `ServerName`, `ServerIcon`) VALUES (" + con.escape(guildid) + ", " + con.escape(guildname) + ", " + con.escape(guildicon) + ");";

                    con.query(sql, function (err, result) {
                        if (err) throw err;
                        console.log(`${guildname} inserted into DB`);
                    });
                }
            }
        });
    });
}

async function check_guild_exists(client, guildid) {
    var exists = await sql_guild(client, guildid);
    return exists[0];
}

function sql_q(settingname, serverID = 0) {
    return new Promise(resolve => {
        this.con.query(`SELECT value FROM settings WHERE setting = ${con.escape(settingname)} AND serverID = ${con.escape(serverID)}`, function (err, result, fields) {
            if (err) throw err;
            resolve(result);
        });
    });
}

function sql_qs(guildid, settingname, value) {
    return new Promise(resolve => {
        this.con.query(`SELECT value FROM settings WHERE setting = ${con.escape(settingname)} AND serverID = ${con.escape(guildid)}`, function (err, result, fields) {
            if (err) throw err;

            if (result.length == 0)
                var sql = `INSERT INTO settings (setting, value, serverID) VALUES (${con.escape(settingname)}, ${con.escape(value)}, ${con.escape(guildid)});`;

            else
                var sql = `UPDATE settings SET value=${con.escape(value)} WHERE (setting=${con.escape(settingname)} AND serverID=${con.escape(guildid)});`;

            con.query(sql, function (err, result) {
                if (err) throw err;
            });
        });


    });
}

function increment_user_commands(userid, guildid) {
    this.con.query(`UPDATE users SET usedCommands=usedCommands+1 WHERE (ID=${con.escape(userid)} AND serverID=${con.escape(guildid)})`, function (err, result, fields) {

        //UPDATE images SET counter=counter+1 WHERE image_id=15 
        if (err) throw err;
    });
}

console.log("=MySQL====================");
console.log("Logged in as " + config.mysql_user + " to " + config.mysql_host);