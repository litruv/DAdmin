exports.name = 'Restart'
exports.alias = ['restart']
exports.helptext = 'Restart DAdmin'
exports.helphide = true
exports.permissions = ['READ_MESSAGES']
exports.category = 'admin'
exports.command = (client, msg) => {
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