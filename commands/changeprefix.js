module.exports = {
    name: "Change Prefix",
    alias: ['changeprefix', 'prefix'],
    helptext: "Changes the bots prefix for the server",
    permissions: ["ADMINISTRATOR"],
    category: 'admin',
    args: ["new-prefix"],
    command: (client, msg) => {
        if (msg.suffix.length != 1) {
            msg.reply("please only use 1 character")
            return;
        }
        client.database.set_setting(msg.guild.id, "prefix", msg.suffix)
        client.cachedserversettings.filter(function (server) {
            return server.guildID == msg.guild.id;
        })[0].prefix = msg.suffix;
    }
}