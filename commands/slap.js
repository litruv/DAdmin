exports.name = 'Slap'
exports.alias = ['slap']
exports.helptext = 'Slaps users to empty channels and back again'
exports.helphide = false
exports.permissions = ['MOVE_MEMBERS']
exports.args = ['@Tag']
exports.category = 'admin'
exports.command = (client, msg) => {
    client.database.get_setting("autoVoice", msg.guild.id).then((autochan) => {
        var itemsProcessed = 0;
        var cid = msg.mentions.members.first().voiceChannelID;

        msg.guild.channels.filter(isVoice).forEach(element => {
            itemsProcessed++;

            if (itemsProcessed <= 8) {
                if (element.id != autochan) {
                    if (element.members.array().length == 0);
                    msg.mentions.members.first().setVoiceChannel(element.id);

                }
                if (itemsProcessed >= msg.guild.channels.filter(isVoice).array().length || itemsProcessed >= 8) {
                    msg.mentions.members.first().setVoiceChannel(cid);
                }
            }
        });
    });

}

function isVoice(value) {
    return value.type == "voice";
}
