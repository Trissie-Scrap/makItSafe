if (process.env.NODE_ENV !== "production") {
    // - Checks if environment is profuction or development.
    require("dotenv").config();
}
const Perspective = require('perspective-api-client');
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
return predicted_value
}

module.exports = {sentiment_message};