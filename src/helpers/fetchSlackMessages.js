import "isomorphic-fetch";
import convertToSeconds from "./convertToSeconds";
import qs from "qs";

export default (config = {}) => {
  const oldest = convertToSeconds(config);

  let formData = {
    token: config.token,
    channel: config.channel,
    oldest
  };

  return fetch("https://slack.com/api/conversations.history", {
    method: "post",
    body: JSON.stringify(formData),
    headers: {
      "content/type": "application/x-www-form-urlencoded"
    }
  }).then(res => {
    console.log(res);
    return res.json();
  });
};
