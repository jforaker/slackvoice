require('dotenv').load();
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');
var inspect = require('eyespect').inspector();
var Slack = require('./Slack');

app.use(express.static(__dirname));
app.use(bodyParser.json({limit: '50mb'}));

app.get('/play', function (request, response) {
    inspect(request.query, 'req');

    var slacker = new Slack(request.channel_id);
    slacker.postMessage(request.query.text, io);
});

io.on('connection', function (socket) {
    console.log("Connected!");
});

server.listen(process.env.PORT || 8080);