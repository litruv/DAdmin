exports.name = 'Kick'
exports.alias = ['kick']
exports.helptext = 'Kicks users from the voice channel'
exports.helphide = false
exports.permissions = ['MOVE_MEMBERS']
exports.args = ['@Tag']
exports.category = 'admin'
exports.command = (client, msg) => {
    if (msg.mentions.members.array().length > 0)
    msg.member.guild.createChannel('Kicked', 'voice')
        .then(channel => {
            msg.mentions.members.first().setVoiceChannel(channel.id);
            c = channel;
            setTimeout(function () {
                c.delete()
            }, 150);
        })
        .catch(console.error);

}