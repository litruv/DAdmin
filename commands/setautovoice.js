module.exports = {
    name: 'Set auto voice',
    alias: ['setautovoice'],
    helptext: 'Sets the auto-sorting voice channel',
    helphide: false,
    permissions: ['ADMINISTRATOR'],
    args: ['VChannelID'],
    category: 'admin',
    command: (client, msg) => {
        client.database.set_setting(msg.guild.id, "autoVoice", msg.suffix);
    }
}