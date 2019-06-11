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
                client.user.setActivity(workweek.workweek[currentUpdate], { type: 'PLAYING' })
            })
        }
        on15Update()

        client.on("message", (msg) => {
            if (msg.author.id != client.user.id) return
            setTimeout(() => { client.user.setStatus('online') }, 100)

            setTimeout(() => { client.user.setStatus('idle') }, 60000 * 5)
        })


    }
}