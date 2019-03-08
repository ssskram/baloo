const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')
const checkToken = require('./../token')

global.Headers = fetch.Headers

// baloo!
router.post('/',
    async function (req, res) {
        res.sendStatus(200)
        // only listen on channel az-alert
        if (req.body.event.channel == "GG9K9JYEM") {
            // if baloo is mentioned by name
            if (req.body.event.type === "app_mention") {
                postMessage({
                    "text": "Hi, <@" + req.body.event.user + ">!",
                    "channel": "GG9K9JYEM"
                })
            }
        }
    }
)

// new alert
router.post('/alert',
    function (req, res) {
        const valid = (checkToken(req.token))
        console.log(req.body)
        if (valid == true) {
            let message
            if (req,body.countError > 1) {
                message = "<!channel> " + eq.body.errorType + " error on " + req.body.appName + " at " + req.body.time
            } else {
                message = message = "<!channel> " + req.body.countError + " " + req.body.errorType + " error on " + req.body.appName + " at " + req.body.time
            }
            postMessage({
                "text": message,
                "channel": "GG9K9JYEM"
            })
            res.status(200).end()
        } else res.status(403).end()
    }
)

// new activity
router.post('/activity',
    function (req, res) {
        const valid = (checkToken(req.token))
        if (valid == true) {
            if (req.body.activity == "Provision") {
                postMessage({
                    "text": "New " + req.body.type + " provisioned! " + req.body.service + " is up and running.",
                    "channel": "GG9K9JYEM"
                })
            }
            if (req.body.activity == "Deployment") {
                postMessage({
                    "text": "New deployment initiated for " + req.body.service,
                    "channel": "GG9K9JYEM"
                })
            }
            res.status(200).end()
        } else res.status(403).end()
    }
)

const postMessage = message => {
    fetch('https://slack.com/api/chat.postMessage', {
        method: 'POST',
        headers: new Headers({
            'Authorization': 'Bearer ' + process.env.BOT_TOKEN,
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(message)
    })
}

module.exports = router