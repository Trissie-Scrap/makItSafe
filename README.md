# makeItSafe.space

Moderates discord messages and images.

## Inspiration

More and more people are using discord form everyday tasks, classroom-activity to office meetings. And places lie these should be safe for everyone.

Thats why we created makeitsafe.space discord bot.

## What it does

- ### Text Moderation

If User send some inappropriate message then that message will deleted after 5 seconds atomatically.
Currently this bot detect spam, insult, profanity, flirtation, threat, sexually inappropriate message.

- ### Image Moderation

If user upload indecorous image then image moderation library classsify image in drawing, hentai, neutral, porn, sexy categories. Based on that inappropriate image will deleted automatically.

## How we built it

For Text Moderation we use Perspective API.
Which is provided by Google-Cloud-Platform.

> Perspective was created by Jigsaw and Google’s Counter Abuse Technology team in a collaborative research project called Conversation-AI.

For Image Moderation we use NSFW.js
Which under the hood uses tensorflow.js

> NSFW.js is a JavaScript library to help you quickly identify unseemly images.

## Challenges we ran into

- figuring out best false-positive rate by changing prediction probablity.

## Accomplishments that we're proud of

- working bot server.
- perspective api configuration

## What we learned

- making discord api
- adding Perspective API
- NSFW library

## What's next for test

- get individual person stats
