# Slack Link Surfer🏄🏾‍

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Build Status](https://travis-ci.org/mtliendo/slack-link-surfer.svg?branch=master)](https://travis-ci.org/mtliendo/slack-link-surfer)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

## Easily scrape links from a Slack channel

> Great for sending out newsletters, generating "You may have missed.." posts, and much more!

### Overview

A minimal-dependency, promise-based library.
This application makes use of [Slack's `conversation.history` API](https://api.slack.com/methods/conversations.history) to provide single channel link-scraping.

Additionally, there are a few configurable options that aim to give greater flexibility into how far you'd like to search for your messages.

### Installation

If using _npm_

`$ npm install slack-link-surfer`

Alternately if using _yarn_

`$ yarn add slack-link-surfer`

### Usage

```js
import fetchSlackLinks from "slack-link-surfer";

const myConfig = {
  token: mySlackUserToken,
  channel: aSlackChannel,
  week: true
  // or day:true or custom: ${seconds}
};

fetchSlackLinks(myConfig).then(links => {
  //do stuff with the goods!
});
```

```js
//If using with NodeJS/commonJS:
const fetchSlackLinks = require("slack-link-surfer").default;
```

#### Configuration Options

| Config Key | Default Value | Required |
| ---------- | ------------- | -------- |
| token      | ""            | YES      |
| channel    | ""            | YES      |
| day        | false         | NO\*     |
| week       | false         | NO\*     |
| custom     | false         | NO\*     |
| exclude    | [String]      | NO       |

**Note that one timeframe _must_ be present**

> `{token, channel, week:true}`

> excluded strings are based on the `service_name` key returned from the API

### Obtaining A Token and Channel ID

Note that Slack has many different types of tokens. A **user** token is needed for this application. A user token is essentially a placeholder for an actual user. This means any channels one can normally access in the app, a user token can be used to do the same.

Simply head [HERE](https://api.slack.com/custom-integrations/legacy-tokens) and in the _Legacy Token Generator_ section, create a new user token (it should start with `xoxp`).

Obtaining the channel you'd wish to scrape is even easier. Simply visit your channel in a browser, and the URL will contain the channel ID.

### Limitations

Because this application looks for `.attachments` within a message object--which is where Slack puts the links, links that don't _unfurl_ (expand) aren't currently displayed. In most cases, this in a non issue, however something to be mindful of.

This application only support single-link messages. This means if a user posts a slack message with several links, only the first link will be captured.
