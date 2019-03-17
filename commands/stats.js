module.exports = {
    name = 'Stats for DAdmin',
    alias =['stats'],
    helptext = 'Metrics on DAdmin, uptime, users, servers',
    helphide = false,
    permissions =['READ_MESSAGES'],
    category = 'general',
    command = (client, msg) => {
        var users = 0;
        for (var i = 0; i < client.guilds.array().length; i++) {
            users += client.guilds.array()[i].members.array().length;
        }

        msg.reply("Running DAdmin for " + millisecondsToStr(client.uptime) + " on " + client.guilds.array().length + " servers for " + users + " users, since 09 Aug 2018");
    }
}

function millisecondsToStr(milliseconds) {

    function numberEnding(number) {
        return (number > 1) ? 's' : '';
    }

    var temp = Math.floor(milliseconds / 1000);
    var years = Math.floor(temp / 31536000);
    if (years) {
        return years + ' year' + numberEnding(years);
    }
    //TODO: Months! Maybe weeks? 
    var days = Math.floor((temp %= 31536000) / 86400);
    if (days) {
        return days + ' day' + numberEnding(days);
    }
    var hours = Math.floor((temp %= 86400) / 3600);
    if (hours) {
        return hours + ' hour' + numberEnding(hours);
    }
    var minutes = Math.floor((temp %= 3600) / 60);
    if (minutes) {
        return minutes + ' minute' + numberEnding(minutes);
    }
    var seconds = temp % 60;
    if (seconds) {
        return seconds + ' second' + numberEnding(seconds);
    }
    return 'less than a second'; //'just now' //or other string you like;
}
