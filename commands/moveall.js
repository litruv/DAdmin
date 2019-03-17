module.exports = {
    name = 'Move all',
    alias =['moveall'],
    helptext = 'Moves all people from one Voice Chat, to the next',
    helphide = false,
    permissions =['MOVE_MEMBERS'],
    args =['ChannelID', 'ChannelID'],
    category = 'admin',
    command = (client, msg) => {
        cleaner = msg.cleanContent.replace(/\s\s+/g, ' ');
        chans = cleaner.split(' ');
        console.log("From: " + chans[1]);
        msg.guild.channels.get(chans[1]).members.forEach(m => {
            m.setVoiceChannel(chans[2]);
        });

    }
}