module.exports = {
    name = 'Get auto parent',
    alias =['getautoparent'],
    helptext = 'gets the auto creation channel',
    helphide = false,
    permissions =['ADMINISTRATOR'],
    category = 'admin',
    command = (client, msg) => {
        client.database.get_setting("autoParent", msg.guild.id).then((r) => {
            msg.reply(`${r} - ${msg.guild.channels.get(r).name}`);
        });
    }
}