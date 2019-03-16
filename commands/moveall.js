exports.name = 'Move all'
exports.alias = ['moveall']
exports.helptext = 'Moves all people from one Voice Chat, to the next'
exports.helphide = false
exports.permissions = ['MOVE_MEMBERS']
exports.args = ['ChannelID', 'ChannelID']
exports.category = 'admin'
exports.command = (client, msg) => {
    cleaner = msg.cleanContent.replace(/\s\s+/g, ' ');
    chans = cleaner.split(' ');
    console.log("From: " + chans[1]);
    msg.guild.channels.get(chans[1]).members.forEach(m => {
        m.setVoiceChannel(chans[2]);
    });

}