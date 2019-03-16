exports.name = 'Set auto voice'
exports.alias = ['setautovoice']
exports.helptext = 'Sets the auto-sorting voice channel'
exports.helphide = false
exports.permissions = ['ADMINISTRATOR']
exports.args = ['VChannelID']
exports.category = 'admin'
exports.command = (client, msg) => {
    client.database.set_setting(msg.guild.id, "autoVoice", msg.suffix);
}