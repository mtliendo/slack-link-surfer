import removeDisallowed from "./helpers/removeDisallowed";
import parseLinksWithAttachments from "./helpers/parseLinksWithAttachments";
import fetchSlackMessages from "./helpers/fetchSlackMessages";

const slackConfigDefaults = {
  token: "",
  channel: "",
  day: false,
  week: false,
  custom: false,
  exclude: []
};

const fetchSlackLinks = (config = slackConfigDefaults) => {
  return fetchSlackMessages(config)
    .then(messages => {
      return parseLinksWithAttachments(messages.filter(msg => msg.attachments));
    })
    .then(msgs => removeDisallowed(msgs, config.exclude))

    .catch(console.error);
};

export default fetchSlackLinks;
