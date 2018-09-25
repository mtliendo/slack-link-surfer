(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.slackLinkSurfer = factory());
}(this, (function () { 'use strict';

  var removeDisallowed = (function () {
    var msgs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [{}];
    var disallowedList = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [""];
    return msgs.filter(function (msg) {
      var reggie = new RegExp(msg.service_name, "i");
      return disallowedList.some(function (disallowedItem) {
        return !disallowedItem.match(reggie);
      });
    });
  });

  var parseLinksWithAttachments = (function () {
    var msgArr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [{
      attachments: []
    }];
    return msgArr.map(function (msg) {
      var _msg$attachments$ = msg.attachments[0],
          text = _msg$attachments$.text,
          title = _msg$attachments$.title,
          fallback = _msg$attachments$.fallback,
          from_url = _msg$attachments$.from_url,
          original_url = _msg$attachments$.original_url,
          service_name = _msg$attachments$.service_name;
      return {
        title: title || text || fallback,
        service_name: service_name,
        link: from_url || original_url || "Technically not a link, but an attached goodie!"
      };
    });
  });

  var realFetch = require('node-fetch');
  module.exports = function(url, options) {
  	if (/^\/\//.test(url)) {
  		url = 'https:' + url;
  	}
  	return realFetch.call(this, url, options);
  };

  if (!global.fetch) {
  	global.fetch = module.exports;
  	global.Response = realFetch.Response;
  	global.Headers = realFetch.Headers;
  	global.Request = realFetch.Request;
  }

  var convertToSeconds = (function () {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var nowInMillis = Date.now();
    var secondsInADay = 86400;
    var secondsInAWeek = 604800;

    if (config.custom) {
      return Math.floor(nowInMillis / 1000 - config.custom);
    } else if (config.day) {
      var dayAgoInSeconds = Math.floor(nowInMillis / 1000 - secondsInADay);
      return dayAgoInSeconds;
    } else if (config.week) {
      var weekAgoInSeconds = Math.floor(nowInMillis / 1000 - secondsInAWeek);
      return weekAgoInSeconds;
    }

    throw new Error("Please supply a valid config object with a key/value of EITHER day:true, week:true, or custom: SECONDS");
  });

  var fetchSlackMessages = (function () {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var oldest = convertToSeconds(config);
    var formData = {
      token: config.token,
      channel: config.channel,
      oldest: oldest
    };
    return fetch("https://slack.com/api/conversations.history", {
      method: "post",
      body: JSON.stringify(formData),
      headers: {
        "content-type": "application/x-www-form-urlencoded"
      }
    }).then(function (res) {
      console.log(res);
      return res.json();
    });
  });

  var slackConfigDefaults = {
    token: "",
    channel: "",
    day: false,
    week: false,
    custom: false,
    exclude: []
  };

  var fetchSlackLinks = function fetchSlackLinks() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : slackConfigDefaults;
    return fetchSlackMessages(config).then(function (messages) {
      console.log(messages);
      return parseLinksWithAttachments(messages.filter(function (msg) {
        return msg.attachments;
      }));
    }).then(function (msgs) {
      return removeDisallowed(msgs, config.exclude);
    }).catch(console.error);
  };

  return fetchSlackLinks;

})));
