require('dotenv').load();
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');
var inspect = require('eyes').inspector({maxLength: 12048});
var Slack = require('./Slack');
var port = process.env.PORT || 8080;

app.use(express.static(__dirname));
app.use(bodyParser.json({limit: '50mb'}));

app.get('/play', function (request, response) {
    inspect(request.query, 'request');
    var slacker = new Slack(request.query.channel_id);
    slacker.postMessage(request.query.text, io);
});

io.on('connection', function (socket) {
    inspect('socket connected!');
});

server.listen(port);
inspect(port, 'Server started on ');