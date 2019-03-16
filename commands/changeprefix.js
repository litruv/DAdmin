exports.name = "Change Prefix"
exports.alias = ['changeprefix','prefix']
exports.helptext = "Changes the bots prefix for the server"
exports.permissions = ["ADMINISTRATOR"]
exports.category = 'admin'
exports.args = ["new-prefix"]
exports.command = (client, msg) => {
    if (msg.suffix.length != 1) {
        msg.reply("please only use 1 character")
        return;
    }
    client.database.set_setting(msg.guild.id, "prefix", msg.suffix)
    client.cachedserversettings.filter(function (server) {
        return server.guildID == msg.guild.id;
      })[0].prefix = msg.suffix;
}