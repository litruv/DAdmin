module.exports = {
    name: "Hello",
    alias: ['hi'],
    helptext: "Says G'day",
    helphide: false,
    permissions: ['READ_MESSAGES'],
    category: 'general',
    command: (client, msg) => {
        msg.reply("G'day!")
    }
}