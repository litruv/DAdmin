exports.name = "Clear Messages"
exports.alias = ['clear']
exports.helptext = "Clears messages from the channel"
exports.helphide = false
exports.permissions = ['VIEW_CHANNEL']
exports.args = ['number']
exports.category = 'admin'

exports.command = (client, msg) => {
    console.log("Clearing: " + msg.suffix);
    msg.channel.bulkDelete(parseInt(msg.suffix)+1);
}