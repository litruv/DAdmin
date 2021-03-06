module.exports = {
    name: 'Slap',
    alias: ['slap'],
    helptext: 'Slaps users to empty channels and back again',
    helphide: false,
    permissions: ['MOVE_MEMBERS'],
    args: ['@Tag'],
    category: 'admin',
    command: (client, msg) => {
        if (msg.mentions.members.array().length > 0)
        if (msg.mentions.members.first().voiceChannelID != undefined)
            client.database.get_setting("autoVoice", msg.guild.id).then((autochan) => {
                var itemsProcessed = 0
                var cid = msg.mentions.members.first().voiceChannelID
                msg.guild.channels.filter(c => c.type == "voice").forEach(element => {
                    itemsProcessed++
                    if (itemsProcessed <= 8) {
                        if (element.id != autochan) {
                            if (element.members.array().length == 0)
                                msg.mentions.members.first().setVoiceChannel(element.id)
                        }
                        if (itemsProcessed >= msg.guild.channels.filter(c => c.type == "voice").array().length || itemsProcessed >= 8) {
                            msg.mentions.members.first().setVoiceChannel(cid)
                        }
                    }
                })
            })
        else
            msg.reply("User isn't in a channel")

    }
}