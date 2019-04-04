#!/usr/bin/env node

/* jshint esversion: 6 */

//Includes
const Discord = require('discord.js')
const client = new Discord.Client()
client.database = require('./database')
const fs = require('fs')
const colors = require('colors');

//Globals

//Database Connection
client.database.connect().then(con => {
  try {
    client.database.get_setting('token').then(token => {
      console.log("=Discord==================")
      client.login(token)
    })
  } catch (e) {
    console.log(e)
  }
})

class cachedsettings {
  constructor(guildID, prefix) {
    this.prefix = prefix
    this.guildID = guildID
  }

  getPrefix() {
    return this.prefix
  }
}

class CachedCommand {
  constructor(alias, file) {
    this.alias = alias
    this.file = file
  }
}

class Commands {
  loadcommands() {
    fs.readdir("./commands/", function (err, items) {
      for (var i = 0; i < items.length; i++) {
        try {
          var reqcommand = require('./commands/' + items[i])
          for (var z = 0; z < reqcommand.alias.length; z++) {
            var cachedcommand = new CachedCommand(reqcommand.alias[z], items[i])
            client.cachedcommands.push(cachedcommand)
          }

        } catch (error) {
          console.log('error with:' + items[i])
          console.error(error)
        }
      }

      for (var i = 0; i < client.cachedcommands.length; i++)
        console.log("Command Loaded: ".cyan + client.cachedcommands[i].alias + " " + client.cachedcommands[i].file.cyan)
    });
  }
}

client.commands = new Commands()
client.cachedcommands = new Array()
client.cachedserversettings = new Array();

client.on('ready', () => {
  console.log("Logged in as " + client.user.tag.green.bold + "!")

  client.commands.loadcommands()
  loadplugins()
})

function loadplugins() {
  fs.readdir("./plugins/", function (err, items) {
    if (err == undefined)
      for (var i = 0; i < items.length; i++) {
        var reqcommand = require('./plugins/' + items[i])
        reqcommand.init(client);
        console.log("Plugin Loaded: ".magenta + reqcommand.name + " " + items[i].magenta)
      }
  })
}

client.on("message", (msg) => {
  if (msg.author.bot) return
  onMessage(msg)
})

function onMessage(msg, again = true) {
  if (msg.channel.type = "dm") {
    doPMCommand(msg, "")
  }
  else {

    if (client.cachedserversettings.filter(function (server) {
      return server.guildID == msg.guild.id
    }).length == 0)
      client.database.get_setting("prefix", msg.guild.id).then(prefix => {
        client.cachedserversettings.push(new cachedsettings(msg.guild.id, prefix))
        doCommand(msg, prefix)
      }).catch(err => {
        if (again == true) {
          client.database.set_setting(msg.guild.id, "prefix", "~")
          onMessage(msg, false)
        }
      })
    else
      doCommand(msg, client.cachedserversettings.filter(function (server) {
        return server.guildID == msg.guild.id
      })[0].getPrefix())

  }
}
function doPMCommand(msg, prefix) {
  var message = msg.cleanContent
  const command = message.substring(prefix.length).split(/[ \n]/)[0].trim().toLowerCase()
  msg.suffix = message.substring(prefix.length + command.length).trim()

  var cmds = client.cachedcommands.filter(cmd => cmd.alias == command);
  if (cmds.length > 0) {
    console.log("CMD:".green + " ".reset + msg.author.username.bold + "#".reset + msg.author.discriminator.reset + " " + prefix.grey + command.green.bold + " ".reset + msg.suffix + " | PM")
    var reqcommand = require('./commands/' + cmds[0].file)
    msg.react('✅')
    try {
      reqcommand.command(client, msg)
    } catch (err) {
      console.error('There was an error running: ' + command);
      console.error(err.stack);
    }
  }

  delete require.cache[require.resolve('./commands/' + cmds[0].file)]
}


function doCommand(msg, prefix) {
  var message = msg.cleanContent
  if (!message.startsWith(prefix)) return

  //Split into command + args
  const command = message.substring(prefix.length).split(/[ \n]/)[0].trim().toLowerCase()
  msg.suffix = message.substring(prefix.length + command.length).trim()

  var cmds = client.cachedcommands.filter(cmd => cmd.alias == command);
  if (cmds.length > 0) {
    console.log("CMD:".green + " ".reset + msg.member.user.username.bold + "#".reset + msg.member.user.discriminator.reset + " " + prefix.grey + command.green.bold + " ".reset + msg.suffix + " | " + msg.guild.name)
    var reqcommand = require('./commands/' + cmds[0].file)
    if (msg.member.hasPermission(reqcommand.permissions)) {
      msg.react('✅')
      try {
        reqcommand.command(client, msg)
      } catch (err) {
        console.error('There was an error running: ' + command);
        console.error(err.stack);
      }
    } else {
      msg.react('⛔')
    }

    delete require.cache[require.resolve('./commands/' + cmds[0].file)]
  }
}
