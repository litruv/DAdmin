module.exports = {
    name: "Clear Messages",
    alias: ['clear'],
    helptext: "Clears messages from the channel",
    helphide: false,
    permissions: ['VIEW_CHANNEL'],
    args: ['number'],
    category: 'admin',
    command: (client, msg) => {
        console.log("Clearing: " + msg.suffix);
        msg.channel.bulkDelete(parseInt(msg.suffix) + 1);
    }
}