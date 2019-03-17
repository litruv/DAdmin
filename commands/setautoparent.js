module.exports = {
    name: 'Set auto parent',
    alias: ['setautoparent'],
    helptext: 'sets the auto creation category',
    helphide: false,
    permissions: ['ADMINISTRATOR'],
    args: ['VChannelID'],
    category: 'admin',
    command: (client, msg) => {
        database.set_setting(msg.guild.id, "autoParent", msg.suffix);
    }
}