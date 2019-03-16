const fs = require('fs')
const Discord = require('discord.js')
var request = require('request');


exports.name = "Anagram Finder"
exports.alias = ['anagram', 'nagaram']
exports.helptext = "finds anagrams up to 9 letters"
exports.permissions = ['VIEW_CHANNEL']
exports.args = ['letters']
exports.command = (client, msg) => {
    
    var url = "http://www.anagramica.com/best/:";

    if (msg.suffix.length > 9){
        msg.reply("That anagram is too long. Max 9 Letters.");
        return;
    }
    request({
        url: url + msg.suffix,
        json: true
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var replystring = "";
            for (i = 0; i < body.best.length; i++)
                replystring += body.best[i] + ', ';
            msg.reply(replystring.substr(0, replystring.length - 2)); // Print the json response
        }
    });

}