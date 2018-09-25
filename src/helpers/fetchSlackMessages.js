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
    body: qs.stringify(formData),
    headers: {
      "content-type": "application/x-www-form-urlencoded"
    }
  })
    .then(res => res.json())
    .then(jsonResp => jsonResp.messages)
    .catch(console.log);
};
