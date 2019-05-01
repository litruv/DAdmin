module.exports = {
    name: "Auto Voice Channel",
    init: (dclient) => {
        client = dclient

        client.on('voiceStateUpdate', (oldMember, newMember) => {
            try {
                var newUserChannel = newMember.voiceChannelID
                client.database.get_setting("autoVoice", newMember.guild.id).then((autochan) => {
                    client.database.get_setting("autoParent", newMember.guild.id).then((autoparent) => {
                        if (newUserChannel == autochan) {
                            if (newMember.presence.game != null) { // Is in game
                                var cid
                                newMember.guild.createChannel(newMember.presence.game.name, 'voice', null, newMember.displayName + ' requested.')
                                    .then(channel => {
                                        channel.setParent(autoparent)
                                        newMember.setVoiceChannel(channel.id)
                                        cid = channel.id

                                        newMember.guild.createChannel(newMember.presence.game.name, 'text', null, newMember.displayName + ' requested.')
                                            .then(chan => {
                                                chan.setParent(autoparent)
                                                chan.setTopic(cid)
                                                chan.send(newMember + " **Hey**, this is the Text channel for your voice chat.\r\n **IT WILL BE DELETED ONCE EVERYONE LEAVES**\nIf you would like to **share screens** or use your **webcam**: **<http://www.discordapp.com/channels/" + chan.guild.id + "/" + cid + "/>**\n*⁽ᵗʰᶦˢ ᶠᵉᵃᵗᵘʳᵉ ᶦˢ ᵒⁿˡʸ ᵃᵛᵃᶦˡᵃᵇˡᵉ ᶦᶠ ʸᵒᵘ'ʳᵉ ᶦⁿ ᵗʰᵉ ᶜʰᵃᵗ⁾*")
                                                //chan.send("https://gfycat.com/RadiantFoolishAmmonite")

                                                console.log("Made a Auto Channel Set: " + newMember.presence.game.name + " - " + newMember.displayName)
                                            })
                                            .catch(console.error)

                                    })
                                    .catch(console.error)

                            } else { // else make a general chat
                                newMember.guild.createChannel("General", 'voice', null, newMember.displayName + ' requested.')
                                    .then(channel => {
                                        channel.setParent(autoparent)
                                        newMember.setVoiceChannel(channel.id)

                                        cid = channel.id

                                        newMember.guild.createChannel("General - " + newMember.displayName, 'text', null, newMember.displayName + ' requested.')
                                            .then(chan => {
                                                chan.setParent(autoparent)
                                                chan.setTopic(cid)
                                                chan.send(newMember + " **Hey**, this is the Text channel for your voice chat.\r\n **IT WILL BE DELETED ONCE EVERYONE LEAVES**\nIf you would like to **share screens** or use your **webcam**: **<http://www.discordapp.com/channels/" + chan.guild.id + "/" + cid + "/>**\n*⁽ᵗʰᶦˢ ᶠᵉᵃᵗᵘʳᵉ ᶦˢ ᵒⁿˡʸ ᵃᵛᵃᶦˡᵃᵇˡᵉ ᶦᶠ ʸᵒᵘ'ʳᵉ ᶦⁿ ᵗʰᵉ ᶜʰᵃᵗ⁾*")
                                                // chan.send("https://gfycat.com/RadiantFoolishAmmonite")
                                                console.log("Made a Auto Channel Set: General - " + newMember.displayName)

                                            })
                                            .catch(console.error)

                                    })
                                    .catch(console.error)

                            }
                        }
                        if (typeof (oldMember.voiceChannel) != "undefined")
                            if (oldMember.voiceChannel.parentID == autoparent) {
                                if (oldMember.voiceChannelID != autochan) {
                                    var c = 0
                                    oldMember.voiceChannel.members.forEach(membs => {
                                        c++
                                    })

                                    if (c == 0) {
                                        console.log("Removing Auto Channel Set: " + oldMember.voiceChannel.name)
                                        oldMember.voiceChannel.delete().then(function () {
                                            newMember.guild.channels.get(autoparent).children.forEach(c => {
                                                if (c.type == "text")
                                                    if (!oldMember.guild.channels.has(c.topic))
                                                        c.delete('Not required anymore')
                                            })
                                        })
                                    }
                                }
                            }
                    })
                })
                if (newUserChannel == "269704205399359491" && newMember.id == "363951609002065931") {
                    newMember.setVoiceChannel("518212645229297705")
                }
            }
            catch (e) {
                console.log("Error on Client Voice Update")
                console.log(e)
            }
        })
    }
}


