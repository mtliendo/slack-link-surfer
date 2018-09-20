require("isomorphic-fetch");
const convertToSeconds = require("./convertToSeconds");
const querystring = require("querystring");

const isClient = typeof window !== "undefined";

module.exports = (config = {}) => {
  const oldest = convertToSeconds(config);

  let formData;

  if (isClient) {
    formData = new FormData();
    formData.append("token", config.token);
    formData.append("channel", config.channel);
    formData.append("oldest", oldest);
  } else {
    formData = querystring.stringify({
      token: config.token,
      channel: config.channel,
      oldest
    });
  }

  return fetch("https://slack.com/api/conversations.history", {
    method: "post",
    body: formData
  }).then(res => res.json());
};
