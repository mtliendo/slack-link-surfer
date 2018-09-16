# Slack Link Surfer🏄🏾‍

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Build Status](https://travis-ci.org/mtliendo/slack-link-surfer.svg?branch=master)](https://travis-ci.org/mtliendo/slack-link-surfer)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

## Easily scrape links from a Slack channel

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
const fetchSlackLinks = require("./slack");

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

| Config Key | Default Value | Required |
| ---------- | ------------- | -------- |
| token      | ""            | YES      |
| channel    | ""            | YES      |
| day        | false         | NO\*     |
| week       | false         | NO\*     |
| custom     | false         | NO\*     |
| exclude    | []            | NO       |

**Note that one timeframe _must_ be present**

> `{token, channel, week:true}`

### Limitations

Because this application looks for `.attachments` within a message object--which is where Slack puts the links, links that don't _unfurl_ (expand) aren't currently displayed. In most cases, this in a non issue, however something to be mindful of.

### Known Issues

- There is currently no way to add a disallowed list to filter out certain items (gifs, etc)
