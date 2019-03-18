var swearjar = require('swearjar')

module.exports = {
    name: "Auto Voice Channel",
    init: (dclient) => {
        var client = dclient

        client.on("message", (msg) => {
            if (swearjar.profane(msg.cleanContent))
                msg.reply("that's profane :(")
        })
    }
}