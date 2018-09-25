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

export const fetchSlackLinks = (config = slackConfigDefaults) => {
  return fetchSlackMessages(config)
    .then(messages => {
      console.log(messages);
      return parseLinksWithAttachments(messages.filter(msg => msg.attachments));
    })
    .then(msgs => removeDisallowed(msgs, config.exclude))

    .catch(console.error);
};

// fetchSlackLinks({
//   exclude: ["code"],
//   week: true,
//   channel: "C02AAKTHX",
//   token:
//     "xoxp-2350673601-214739420454-441668723111-46dc28c7fceb1ce9a598e641b0b4aadf"
// }).then(data => {
//   console.log("hlo");
//   console.log(data);
// });
