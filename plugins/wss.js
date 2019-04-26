const fs = require('fs');
const https = require('https');
const WebSocket = require('ws');
const { parse, stringify } = require('flatted/cjs');

module.exports = {
    name: "Websockets Server (8080)",
    init: (dclient) => {
        const server = https.createServer({
            cert: fs.readFileSync('./cert.pem'),
            key: fs.readFileSync('./privkey.pem')
        });
        const wss = new WebSocket.Server({ server });

        wss.on('connection', function connection(ws) {
            ws.on('message', function incoming(message) {
                console.log('received: %s', message);
                var data = parse(message)

                var response = {
                    type: "data",
                    data: new Array()
                }

                if (data.type == "request") {
                    for (var i = 0; i < data.requests.length; i++) {
                        var resp = ""
                        if (data.requests[i] == "name")
                            resp = dclient.user.username
                        if (data.requests[i] == "id")
                            resp = dclient.user.id
                        if (data.requests[i] == "discriminator")
                            resp = dclient.user.discriminator
                        response.data.push({ type: data.requests[i], data: resp })
                    }

                    ws.send(response)
                }
            });
            ws.send('Connected');
        });

        setInterval(() => { //heartbeat
            wss.clients.forEach(client => {
                if (client.readyState == client.OPEN) {
                    client.send(JSON.stringify({ type: "heartbeat", time: new Date().getTime() }))
                    client.ping()
                }
            });
        }, 30000);

        server.listen(8080);

    }
}