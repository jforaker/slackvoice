# Slackvoice

A simple app written in node.js to play sound effects on different webhook triggers to any other machine running the same webpage.

Example slash command for voice audio output:

```sh
/sound speak Hello world
```

OR just a sound effect (cha-ching):

```sh
/sound money
```

### Tech

* [Express.js]
* [Socket.io]
* [Slack API]

### Installation

```sh
$ npm install
```

```sh
$ export SLACK_URL=your Slack incoming webhook url
$ node server.js
```

Open in browser with:
http://localhost:8080

