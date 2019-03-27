const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

// baloo!
router.post("/", async (req, res) => {
  res.sendStatus(200);
  // only listen on channel az-alert
  if (
    req.body.event.channel == "GGT3BCHDZ" ||
    req.body.event.channel == "GGZNDPJPJ"
  ) {
    // if baloo is mentioned by name
    if (req.body.event.type === "app_mention") {
      postMessage({
        text: "Hi, <@" + req.body.event.user + ">!",
        channel: req.body.event.channel
      });
    }
  }
});

const postMessage = message => {
  fetch("https://slack.com/api/chat.postMessage", {
    method: "POST",
    headers: new Headers({
      Authorization: "Bearer " + process.env.BOT_TOKEN,
      "Content-Type": "application/json"
    }),
    body: JSON.stringify(message)
  });
};

module.exports = router;
