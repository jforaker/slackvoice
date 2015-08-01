var inspect = require('eyespect').inspector(),
    request = require('request'),
    $ = require('jquery-deferred'),
    _ = require('lodash')
    ;

function Slack(channel) {
    this.channel = channel;
}

Slack.prototype.postMessage = function (query, io) {

    var def = $.Deferred();
    var _that = this;

    inspect(query, 'query Slack.postMessage()');

    var str = _.trim(query).split(" ");
    var text, arr;
    if(str[0] === 'speak'){
        arr = _.without(str, str[0]);
        text = _.map(arr, _.identity).join(' ');
        io.emit('speak', text, "US English Female");

    } else {
        io.emit(query);
    }

    var options = {
        body: {
            channel: _that.channel,
            "attachments": [
                {
                    "fallback": "Required text summary of the attachment that is shown by clients that understand attachments but choose not to show them.",
                    "color": "#e74c3c",
                    "fields": [
                        {
                            "title": "you got played. " + query,
                            "short": true
                        }
                    ]
                }
            ]
        },
        json: true,
        url: process.env.SLACK_URL
    };

    var callBack = function (error, response, body) {
        if (error) {
            inspect(error, 'error slack');
            def.reject({status: 500, data: {error: error.message}});
        } else if (response.statusCode == 200) {
            inspect(body, 'Slack success body');
            def.resolve(body);
        } else {
            inspect(body, 'Slack Error body');
            def.reject(body);
        }
    };

    request.post(options, callBack);
    return def.promise();
};

module.exports = Slack;
