var request = require('request');
String.prototype.replaceAll = function(reallyDo, replaceWith, ignoreCase) {
    if (!RegExp.prototype.isPrototypeOf(reallyDo)) {
        return this.replace(new RegExp(reallyDo, (ignoreCase ? "gi": "g")), replaceWith);
    } else {
        return this.replace(reallyDo, replaceWith);
    }
};

var dom = require('xmldom').DOMParser;

var _baseUri = "http://106.ihuyi.com/webservice/sms.php?method=Submit";

var iHuyi = function() {
    this.spidex = require("spidex");
    //this.spidex.setDefaultUserAgent(_userAgent);

    this.account = 'C70913215';
    this.password = '125ff924fc601a4dcc88a29cdb5c6ae2';
};

/**
 * send an SMS.
 * @param mobile
 * @param content
 * @param callback
 */
iHuyi.prototype.send = function(mobile, content, callback) {
    var data = {
        account         : this.account,
        password        : this.password,
        mobile          : mobile,
        content         : content
    };

    this.spidex.post(_baseUri, {data:data, charset:"utf8"}, function(html, status) {
        if(status !== 200) {
            callback(new Error("短信发送服务器响应失败。"));
            return;
        }

        html = html.replaceAll("\r", "");
        html = html.replaceAll("\n", "");
        html = html.replaceAll(" xmlns=\"http://106.ihuyi.com/\"", "");

        //console.log(html);
        var doc = new dom().parseFromString(html);
        var result = doc.lastChild;
        var json = {};
        for(var node = result.firstChild; node !== null; node = node.nextSibling) {
            json[node.tagName] = node.firstChild.data;
        }

        //console.log(json);
        if(json.code == "2") {
            callback(null, json.smsid);
        } else {
            callback(new Error(json.msg, parseInt(json.code)));
        }
    }).on("err", function(e) {
        callback(e);
    });
};

module.exports = iHuyi;
