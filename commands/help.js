const fs = require('fs')
const Discord = require('discord.js')

module.exports = {
    name = "Help file",
    alias =['help', '?'],
    helptext = "Runs this help menu",
    permissions =['VIEW_CHANNEL'],
    args =['(general)/music/admin'],
    command = (client, msg) => {
        fs.readdir("./commands/", function (err, items) {
            var embed = new Discord.RichEmbed
            embed.color = 0x0ca9fe
            //embed.setAuthor("DAdmin", "https://cdn.discordapp.com/avatars/476369946386104330/833d7f2fcae8a31f6c74551c8f703ca8.png", "https://litruv.com")


            var suffix = msg.suffix;
            var lookingfor = 0
            if (msg.suffix.toLowerCase() == "admin") {
                lookingfor = 1
                suffix = "admin"
            } else if (msg.suffix.toLowerCase() == "music") {
                lookingfor = 2
                suffix = "music"
            } else {
                lookingfor = 0;
                suffix = "general"

            }

            var description = "";
            switch (lookingfor) {
                case 0:
                    description += "General Commands"
                    break;
                case 1:
                    description += "Admin Commands"
                    break;
                case 2:
                    description += "Music Commands"
                    break
            }

            description += "\n\n"

            for (var i = 0; i < items.length; i++) {
                var reqcommand = require("./" + items[i])
                if (reqcommand.helphide)
                    continue;
                if (reqcommand.category == undefined)
                    reqcommand.category = 'general'
                if (reqcommand.category != suffix)
                    continue;

                description += "**" + reqcommand.name + "** - *" + reqcommand.helptext + "* \n     "
                args = "";

                if (reqcommand.args != undefined)
                    for (var z = 0; z < reqcommand.args.length; z++) {
                        args += "<" + reqcommand.args[z] + ">"
                    }
                description += "```apache\n"
                for (var z = 0; z < reqcommand.alias.length; z++) {
                    description += client.cachedserversettings.filter(function (server) {
                        return server.guildID == msg.guild.id;
                    })[0].prefix

                    description += reqcommand.alias[z] + " ";
                    if (z != reqcommand.alias.length - 1)
                        description += "/ ";
                }

                description += "\n" + args + "```"
                if (i != items.length - 1)
                    description += "\n";

                delete require.cache[require.resolve('./' + items[i])]

            }
            embed.setDescription(description)

            msg.channel.send(embed);
        })

    }
}