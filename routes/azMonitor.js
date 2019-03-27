const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

// new alert, az-monitor
router.post("/alert", (req, res) => {
  postMessage({
    text:
      "*ERROR* (" +
      req.body.countError +
      ") " +
      req.body.errorType +
      " error on " +
      req.body.appName +
      " at " +
      req.body.time,
    channel: "GGT3BCHDZ"
  });
  res.status(200).end();
});

// client error
router.post("/clientError", (req, res) => {
  postMessage({
    text: "_" + req.body.errorMessage + "_",
    channel: "GGT3BCHDZ"
  });
  res.status(200).end();
});

// new activity
router.post("/activity", (req, res) => {
  if (req.body.activity == "Provision") {
    postMessage({
      text:
        "*Provisioning* '" +
        req.body.service +
        "' -- a new " +
        req.body.type +
        " service",
      channel: "GGT3BCHDZ"
    });
  }
  if (req.body.activity == "Deployment") {
    postMessage({
      text: "*Deploying* " + req.body.service,
      channel: "GGT3BCHDZ"
    });
  }
  res.status(200).end();
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
