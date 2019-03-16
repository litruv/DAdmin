exports.name = "Change <@476369946386104330>'s Name"
exports.alias = ['botname']
exports.helptext = "Changes the bots name on the server"
exports.permissions = ["MANAGE_NICKNAMES"]
exports.args = ["new-name"]
exports.category = 'admin'
exports.command = (client, msg) => {
    msg.guild.me.setNickname(msg.suffix);
}