module.exports = {
    name: "Change <@476369946386104330>'s Name",
    alias: ['botname'],
    helptext: "Changes the bots name on the server",
    permissions: ["MANAGE_NICKNAMES"],
    args: ["new-name"],
    category: 'admin',
    command: (client, msg) => {
        msg.guild.me.setNickname(msg.suffix);
    }
}