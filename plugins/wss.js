const fs = require('fs');
const https = require('https');
const WebSocket = require('ws');



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
                if (message == "name")
                    ws.send(JSON.stringify(
                        {
                            type: 'starterpack',
                            user: {
                                avatar: dclient.avatar,
                                avatarURL: dclient.avatarURL,
                                bot: dclient.bot,
                                client: dclient.client,
                                createdAt: dclient.createdAt,
                                createdTimestamp: dclient.createdTimestamp,
                                defaultAvatarURL: dclient.defaultAvatarURL,
                                discriminator: dclient.discriminator,
                                displayAvatarURL: dclient.displayAvatarURL,
                                id: dclient.id,
                                lastMessage: dclient.lastMessage,
                                lastMessageID: dclient.lastMessageID,
                                presence: dclient.presence,
                                tag: dclient.tag,
                                username: dclient.username,
                                verified: dclient.verified
                            }
                        }))
            });


            ws.send('something');
        });

        server.listen(8080);

    }
}