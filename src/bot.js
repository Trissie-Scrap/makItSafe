// imports
if (process.env.NODE_ENV !== "production") {
  // - Checks if environment is profuction or development.
  require("dotenv").config();
}
const { Client } = require("discord.js");
const Perspective = require('perspective-api-client');
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
client.on("message", (message) => {
  // ignore messages sent by a bot.
  if (message.author.bot) return;

  // TODO: MODERATION---
  // TODO: COMMANDS ---
  sentiment_message(message.content).then((response)=>{

      if(predicted_value['threat']>0.8){
       
        message.reply("Inappropriate")
      }
  })

  // TEST: set-up ---
  if (message.content === "hello") {
    message.reply("Hello");
  }
});

const perspective = new Perspective({apiKey:process.env.API_KEY});

// sentiment_message function will take message as input and prdict value based on different attribute
// gloable variable
var predicted_value
async function sentiment_message (text) {
  const result = await perspective.analyze(text,{attributes: ['unsubstantial', 'spam','profanity','flirtation','insult','threat','sexually_explicit']});
  var data=JSON.parse(JSON.stringify(result, null, 2));
  var attribute=data["attributeScores"]
   predicted_value=
        {'threat':attribute["THREAT"].summaryScore.value,
        'profanity':attribute["PROFANITY"].summaryScore.value,
        'insult':attribute["INSULT"].summaryScore.value,
        'unsubstantial':attribute["UNSUBSTANTIAL"].summaryScore.value,
        'spam':attribute["SPAM"].summaryScore.value,
        'flirtation':attribute["FLIRTATION"].summaryScore.value,
        'sexually_explicit':attribute["SEXUALLY_EXPLICIT"].summaryScore.value
      }

  
}