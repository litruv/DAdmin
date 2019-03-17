module.exports = {
    name: 'Restart',
    alias: ['restart'],
    helptext: 'Restart DAdmin',
    helphide: true,
    permissions: ['READ_MESSAGES'],
    category: 'admin',
    command: (client, msg) => {
        var r = "220772082055774210";
        if (msg.member.id == r) {
            msg.react("✅");
            msg.reply("Shutting Down.. 😭");
            setTimeout(function () {
                process.exit(22);
            }, 1000);
        } else {
            msg.react("❌");
        }
    }
}