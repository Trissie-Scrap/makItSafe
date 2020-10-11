// imports
if (process.env.NODE_ENV !== "production") {
	// - Checks if environment is profuction or development.
	require("dotenv").config();
}

// local modules
const attachment_moderator = require("./moderators/attachment_moderator");
const text_moderator = require('./moderators/text_moderator');

// new Client instance
const { Client } = require("discord.js");
const client = new Client();

// bot token from env variable
const BOT_TOKEN = process.env.BOT_TOKEN;

// load ml model
attachment_moderator.load_model().then(() => {
	client.login(BOT_TOKEN);
});

// ready event
client.on("ready", () => {
	console.log(`${client.user.tag} Listening`);
});

// message event
client.on("message", async (messageRef) => {
	// ignore messages sent by a bot.
	if (messageRef.author.bot) return;
  
  // COMMANDS ---
	// Health Check Test
	if (messageRef.content === "!status") {
		messageRef.channel.send("Bot Status: HEALTHY");
	}

  msg_scanned += 1
	delete_flag = false;

	// MODERATION---
	// Attachment moderation
	messageRef.attachments.forEach(async (attachment) => {
		let prediction = await attachment_moderator.moderate(attachment);
    
		// DEBUG log
		if (process.env.NODE_ENV !== "production") {
			console.log("[INFO] ",prediction);
		}
		
		// check if its inappropriate
		if (prediction)
		{
			const allowed_attributes = ["Neutral", "Drawing"];
			// check if its inappropriate
			if (!allowed_attributes.includes(prediction)) {
        delete_flag = true
        msg_deleted += 1
				deleteMessage(messageRef);
			}
		}
	});

	// Text moderation
	if (messageRef.content != "" && delete_flag==false)
	{
		text_moderator.moderate(messageRef.content)
		.then(predictions => {

			// DEBUG log
			if (process.env.NODE_ENV !== "production") {
				console.log("[INFO] ",predictions);
			}

			for(let category in predictions)
			{
				if(predictions[category]>0.7)
				{
          console.log("[Mod] Message was inappropriate")
          msg_deleted += 1
					deleteMessage(messageRef)
					break
				}
			}
		})
		.catch(e => {
			console.error(e.message)
		})
	}
})

// reply message
// original message delete after 5 seconds
// reply message modify 
function deleteMessage(messageRef) {
	messageRef
	  .reply("Inappropriate message, hence will be deleted after 5 seconds")
	  .then((responseRef) => {
		messageRef
		  .delete({ timeout: 5000 })
		  .then(() => {
			responseRef.edit("_Inappropriate message deleted by MySafePlace Bot_");
		  })
		  .catch((err) => {
			console.error(err.message);
		  });
	});
}

// stats variables
let msg_scanned = 0
let msg_deleted = 0

function getStats(){
	return {
		'scanned': msg_scanned,
		'deleted': msg_deleted,
	}
}

module.exports = getStats
