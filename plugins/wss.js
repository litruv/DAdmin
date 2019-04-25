const fs = require('fs');
const https = require('https');
const WebSocket = require('ws');



module.exports = {
    name: "Websockets Server (8080)",
    init: (dclient) => {
        client = dclient


        const server = https.createServer({
            cert: fs.readFileSync('./cert.pem'),
            key: fs.readFileSync('./privkey.pem')
        });
        const wss = new WebSocket.Server({ server });

        wss.on('connection', function connection(ws) {
            ws.on('message', function incoming(message) {
                console.log('received: %s', message);
                ws.send(`something ${message}`);
            });

            ws.send('something');
        });

        server.listen(8080, "0.0.0.0");

    }
}