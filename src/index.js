const axios = require("axios");
const querystring = require("querystring");

const slackConfigDefaults = {
  token: "",
  channel: "",
  day: false,
  week: false,
  custom: false
};

const fetchSlackLinks = (config = slackConfigDefaults) => {
  return fetchSlackMessages(config)
    .then(({ messages }) =>
      parseLinksWithAttachments(messages.filter(msg => msg.attachments))
    )
    .catch(console.error);
};

const fetchSlackMessages = config => {
  const oldest = convertToSeconds(config);

  return axios
    .post(
      "https://slack.com/api/conversations.history",
      querystring.stringify({
        token: config.token,
        channel: config.channel,
        oldest
      })
    )
    .then(data => data.data);
};

const convertToSeconds = config => {
  const nowInMillis = Date.now();
  const secondsInADay = 86400;
  const secondsInAWeek = 604800;

  if (config.custom) {
    return Math.floor(nowInMillis / 1000 - config.custom);
  } else if (config.day) {
    const dayAgoInSeconds = Math.floor(nowInMillis / 1000 - secondsInADay);

    return dayAgoInSeconds;
  } else if (config.week) {
    const weekAgoInSeconds = Math.floor(nowInMillis / 1000 - secondsInAWeek);

    return weekAgoInSeconds;
  }

  throw new Error(
    "Please supply a valid config object with a key/value of EITHER day:true, week:true, or custom: SECONDS"
  );
};

const parseLinksWithAttachments = (msgArr = []) => {
  return msgArr.map(msg => {
    const {
      text,
      title,
      fallback,
      from_url,
      original_url
    } = msg.attachments[0];

    return {
      title: title || text || fallback,
      link:
        from_url ||
        original_url ||
        "Technically not a link, but an attached goodie!"
    };
  });
};

module.exports = fetchSlackLinks;
