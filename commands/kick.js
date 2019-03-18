module.exports = {
    name: 'Kick',
    alias: ['kick'],
    helptext: 'Kicks users from the voice channel',
    helphide: false,
    permissions: ['MOVE_MEMBERS'],
    args: ['@Tag'],
    category: 'admin',
    command: (client, msg) => {
        if (msg.mentions.members.array().length > 0)
            if (msg.mentions.members.first().voiceChannelID != undefined)
                msg.member.guild.createChannel('Kicked', 'voice')
                    .then(channel => {
                        msg.mentions.members.first().setVoiceChannel(channel.id);
                        c = channel;
                        setTimeout(function () {
                            c.delete()
                        }, 150);
                    })
                    .catch(console.error);
            else
                msg.reply("User isn't in a channel")

    }
}