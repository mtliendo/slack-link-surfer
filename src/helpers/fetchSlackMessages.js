import axios from "axios";
import querystring from "querystring";
import { convertToSeconds } from "./convertToSeconds";

export const fetchSlackMessages = (config = {}) => {
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
