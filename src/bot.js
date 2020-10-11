// imports
if (process.env.NODE_ENV !== "production") {
  // - Checks if environment is profuction or development.
  require("dotenv").config();
}
const { Client } = require("discord.js");

// bot token from env variable
const BOT_TOKEN = process.env.BOT_TOKEN;

// new Client instance
const client = new Client();

client.login(BOT_TOKEN);
// ready event
client.on("ready", () => {
  console.log(`${client.user.tag} Started`);
});

// message event
client.on("message", (messageRef) => {
  // ignore messages sent by a bot.
  if (messageRef.author.bot) return;

  // TODO: MODERATION---
  // TODO: COMMANDS ---

  // TEST: set-up ---
  if (messageRef.content === "hello") {
    messageRef.reply("Hello");
  }
});
