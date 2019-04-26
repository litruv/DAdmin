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
            console.log("Broadcasting to " + wss.clients.size + " clients")
            n++;
        }, 30000);

        server.listen(8080);

    }
}