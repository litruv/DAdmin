exports.name = 'Get auto parent'
exports.alias = ['getautoparent']
exports.helptext = 'gets the auto creation channel'
exports.helphide = false
exports.permissions = ['ADMINISTRATOR']
exports.category = 'admin'
exports.command = (client, msg) => {
    client.database.get_setting("autoParent", msg.guild.id).then((r) => {
        msg.reply(`${r} - ${msg.guild.channels.get(r).name}`);
    });
}