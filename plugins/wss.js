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
                                avatar: dclient.user.avatar,
                                avatarURL: dclient.user.avatarURL,
                                bot: dclient.user.bot,
                                //   client: dclient.user.client,
                                createdAt: dclient.user.createdAt,
                                createdTimestamp: dclient.user.createdTimestamp,
                                defaultAvatarURL: dclient.user.defaultAvatarURL,
                                discriminator: dclient.user.discriminator,
                                displayAvatarURL: dclient.user.displayAvatarURL,
                                id: dclient.user.id,
                                lastMessage: dclient.user.lastMessage,
                                lastMessageID: dclient.user.lastMessageID,
                                presence: dclient.user.presence,
                                tag: dclient.user.tag,
                                username: dclient.user.username,
                                verified: dclient.user.verified
                            }
                        }))

                dclient.on('message', (message) => {
                    ws.send(message)
                })
            });


            ws.send('something');
        });




        server.listen(8080);

    }
}