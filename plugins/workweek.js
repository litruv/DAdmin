const moment = require("moment")
const fs = require('fs')

module.exports = {
    name: "Nine to Five",
    init: (dclient) => {
        client = dclient
        moment().utcOffset(0)
        client.user.setStatus('idle')
        setInterval(on15Update, 900000)

        function on15Update() {
            var currentUpdate = Math.round((moment().day() * 24 * 60 + (moment().hour() * 60) + moment().minute()) / 15)
            fs.readFile("workweek.json", "utf8", function (err, data) {
                let workweek = JSON.parse(data)
                if (workweek.workweek[currentUpdate] == "Movie")
                    client.user.setActivity(workweek.workweek[currentUpdate], { type: 'WATCHING' })
                else if (workweek.workweek[currentUpdate] == "Games") {

                    getGames(client).then((games) => {
                        var mf = 1;
                        var m = 0;
                        var item;

                        for (var i = 0; i < games.length; i++) {
                            for (var j = i; j < games.length; j++) {
                                if (games[i] == games[j])
                                    m++;
                                if (mf < m) {
                                    mf = m;
                                    item = games[i];
                                }
                            }
                            m = 0;
                        }

                        client.user.setActivity(item, { type: 'PLAYING' })
                    })
                }
                else
                    client.user.setActivity(workweek.workweek[currentUpdate], { type: 'PLAYING' })
            })
        }

        client.on("message", (msg) => {
            if (msg.author.id != client.user.id) return
            setTimeout(() => { client.user.setStatus('online') }, 100)

            setTimeout(() => { client.user.setStatus('idle') }, 60000 * 5)
        })


        on15Update()
    }
}

var getGames = (client) => {
    return new Promise((resolve, reject) => {
        let games = new Array()
        var i = 0;
        client.guilds.tap(guild => {
            i++

            guild.members.tap(user => {
                if (user.presence.game != null) {
                    if (!user.user.bot) {
                        games.push(user.presence.game.name)
                    }
                }
            })

            if (i == client.guilds.size)
                resolve(games)
        })
    })
}