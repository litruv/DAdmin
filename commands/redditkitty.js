var request = require('request');
var url = "https://www.reddit.com/r/cats/hot/.json?limit=100";

module.exports = {
    name = 'Kitty',
    alias =['kitty'],
    helptext = 'Inserts good boye from reddit/r/cats',
    helphide = false,
    permissions =['READ_MESSAGES'],
    category = 'general',
    command = (client, msg) => {
        request({
            url: url,
            json: true
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                var sent = false;
                while (!sent) {
                    var jokenumber = getRandomInt(1, 25);
                    if (body.data.children[jokenumber].data.url.endsWith(".jpg")) {
                        msg.channel.send({ file: body.data.children[jokenumber].data.url });
                        sent = true;
                    }
                }
            }
        });
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}