const fs = require('fs')
const Discord = require('discord.js')
const request = require('request');

module.exports = {
    name: "Anagram Finder",
    alias: ['anagram', 'nagaram'],
    helptext: "finds anagrams up to 9 letters",
    permissions: ['VIEW_CHANNEL'],
    category: "general",
    args: ['letters'],
    command: (client, msg) => {

        var url = "http://www.anagramica.com/best/:"

        if (msg.suffix.length > 9) {
            msg.reply("That anagram is too long. Max 9 Letters.")
            return;
        }
        request({
            url: url + msg.suffix,
            json: true
        }, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                var replystring = ""
                for (i = 0; i < body.best.length; i++)
                    replystring += body.best[i] + ', '
                msg.reply(replystring.substr(0, replystring.length - 2))
            }
        });

    }
}