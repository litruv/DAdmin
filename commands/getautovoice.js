exports.name = 'Get auto voice'
exports.alias = ['getautovoice']
exports.helptext = 'Set the auto-sorting channel'
exports.helphide = false
exports.permissions = ['READ_MESSAGES']
exports.category = 'admin'
exports.command = (client, msg) => {
    client.database.get_setting("autoVoice", msg.guild.id).then((r) => {
        msg.reply(`${r} - ${msg.guild.channels.get(r).name}`);
    });

}