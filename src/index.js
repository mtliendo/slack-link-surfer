const removeDisallowed = require("./helpers/removeDisallowed");
const parseLinksWithAttachments = require("./helpers/parseLinksWithAttachments");
const fetchSlackMessages = require("./helpers/fetchSlackMessages");

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
    .then(({ messages }) =>
      parseLinksWithAttachments(messages.filter(msg => msg.attachments))
    )
    .then(msgs => removeDisallowed(msgs, config.exclude))

    .catch(console.error);
};

fetchSlackLinks({
  exclude: ["code"],
  week: true,
  channel: "C02AAKTHX",
  token:
    "xoxp-2350673601-214739420454-437249814551-40be13c13923d9567faca1013ad46ffb"
}).then(data => {
  console.log(data);
});
//module.exports = fetchSlackLinks;
