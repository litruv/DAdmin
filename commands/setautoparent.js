exports.name = 'Set auto parent'
exports.alias = ['setautoparent']
exports.helptext = 'sets the auto creation category'
exports.helphide = false
exports.permissions = ['ADMINISTRATOR']
exports.args = ['VChannelID']
exports.category = 'admin'
exports.command = (client, msg) => {
    database.set_setting(msg.guild.id, "autoParent", msg.suffix);
}