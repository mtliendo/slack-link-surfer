const slackLinkSurfer = require("./slack-link-surfer");
console.log(slackLinkSurfer);
slackLinkSurfer({
  exclude: ["code"],
  week: true,
  channel: "C02AAKTHX",
  token:
    "xoxp-2350673601-214739420454-441668723111-46dc28c7fceb1ce9a598e641b0b4aadf"
}).then(data => {
  console.log("hlo");
  console.log(data);
});
