// imports
if (process.env.NODE_ENV !== "production") {
  // - Checks if environment is profuction or development.
  require("dotenv").config();
}
const { Client } = require("discord.js");
// local modules
const attachment_moderator = require("./moderators/attachment_moderator");
// new Client instance
const client = new Client();
// bot token from env variable
const BOT_TOKEN = process.env.BOT_TOKEN;

// load ml model
attachment_moderator.load_model().then(() => {
  client.login(BOT_TOKEN);
});

// stats variables
let msg_scanned = 0
let msg_deleted = 0


// ready event
client.on("ready", () => {
  console.log(`${client.user.tag} Started`);
});

// message event
client.on("message", async (messageRef) => {
  // ignore messages sent by a bot.
  if (messageRef.author.bot) return;

  msg_scanned += 1

  // TODO: COMMANDS ---
  // MODERATION---
  // Attachment moderation
  messageRef.attachments.forEach(async (attachment) => {
    let prediction = await attachment_moderator.moderate(attachment);

    // DEBUG log
    if (process.env.NODE_ENV !== "production") {
      console.log(prediction);
    }
    const allowed_attributes = ["Neutral", "Drawing"];
    // check if its inappropriate
    if (!allowed_attributes.includes(prediction)) {
      deleteMessage(messageRef);
    }
  });

});

// global message delete function
function deleteMessage(messageRef) {	
  msg_deleted += 1
  messageRef
    .reply("Inappropriate message, hence will be deleted after 5 seconds")
    .then((responseRef) => {
      messageRef
        .delete({ timeout: 5000 })
        .then(() => {
          responseRef.edit("Inappropriate Message was deleted");
        })
        .catch((err) => {
          console.error(err);
        });
    });
}

function getStats(){
	return {
		'scanned': msg_scanned,
		'deleted': msg_deleted,
	}
}

module.exports = getStats
