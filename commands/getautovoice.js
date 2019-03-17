module.exports = {
    name = 'Get auto voice',
    alias =['getautovoice'],
    helptext = 'Set the auto-sorting channel',
    helphide = false,
    permissions =['READ_MESSAGES'],
    category = 'admin',
    command = (client, msg) => {
        client.database.get_setting("autoVoice", msg.guild.id).then((r) => {
            msg.reply(`${r} - ${msg.guild.channels.get(r).name}`);
        });

    }
}