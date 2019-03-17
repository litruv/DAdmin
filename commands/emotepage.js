module.exports = {
    name: "Emote Page Test",
    alias: ['emotetest'],
    helptext: "testing for emote responses",
    helphide: true,
    command: (client, msg) => {

        msg.reply("testing emote thing")
            .then(sent => {
                sent.react('555213405217226776').then(
                    () => message.react('555213429200388116'));
                const filter = (reaction, user) => user.id === msg.member.user.id

                sent.awaitReactions(filter)
                    .then(collected => console.log(`Collected ${collected.size} reactions`))
                    .catch(console.error);
            })
        return true;
    }
}