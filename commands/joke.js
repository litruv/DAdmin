var request = require('request');
var url = "https://www.reddit.com/r/dadjokes/hot/.json?limit=100";

module.exports = {
    name: 'joke',
    alias: ['joke'],
    helptext: 'Fresh dad jokes from reddit.com/r/dadjokes',
    helphide: false,
    permissions: ['READ_MESSAGES'],
    category: 'general',
    command: (client, msg) => {
        request({
            url: url,
            json: true
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {

                //var parsed = JSON.parse(response)
                var jokenumber = getRandomInt(0, 25);
                msg.reply(body.data.children[jokenumber].data.title + " " + body.data.children[jokenumber].data.selftext); // Print the json response
            }
        });
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}