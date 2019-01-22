const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
  console.log(
    `Logged in as ${
      client.user.tag
    }! Use command !raidhelp to get details about all the available commands.`
  );
  client.user.setGame("on SourceCode!");
});

client.on("message", msg => {
  if (msg.author.bot) return;
  if (msg.channel.type === "dm") return;

  const prefix = botconfig.prefix;
  const messageArray = msg.content.split(" ");
  const cmd = messageArray[0];
  const args = messageArray.slice(1);

  if (cmd === `${prefix}raidhelp`) {
    return msg.channel.send(
      "```Commands: !raidrandom and !raidtarget <target_url>\n\n!raidrandom: This command is used to get a random user who is about to be raided.\n\n!raidtarget <target_url>: Used to raid a stream by specifying the stream url.```"
    );
  }
  if (cmd === `${prefix}raidrandom`) {
    let membersArray = [];
    msg.guild.members.filter(member => {
      if (member.roles.exists("name", "owner")) membersArray.push(member.user);
    });
    randomNumber = Math.floor(Math.random() * membersArray.length);
    randomUser = membersArray[randomNumber];
    console.log(randomUser);
    return msg.channel.send(
      `${randomUser} is the lucky one today. Let's raid his stream. Type !raidtarget <${randomUser}'s twitch url> to begin the raid`
    );
  }

  if (cmd === `${prefix}raidtarget`) {
    return msg.channel.send(
      `@everyone We got our raid target. Lets raid! ${args}`
    );
  }
});

client.login(botconfig.token);
