const {sentiment_message} = require('./textDetection.js')

if (process.env.NODE_ENV !== "production") {
  // - Checks if environment is profuction or development.
  require("dotenv").config();
}
const BOT_TOKEN = process.env.BOT_TOKEN;

const { Client } = require("discord.js");
const client = new Client();

client.on("ready", () => {
  console.log(`${client.user.tag} Started`);
});

client.on("message", (message) => {
  // ignore messages sent by a bot.
  if (message.author.bot) return;

  // Health Check Test
  if (message.content === "!status") {
    message.channel.send("BOT STATUS: HEALTHY");
  }

  sentiment_message(message.content).then((predicted_value)=>{
      if(predicted_value['threat']>0.8){
        console.log("Message was inappropriate")
        message.reply("Inappropriate")
      }
  })
});

client.login(BOT_TOKEN);
