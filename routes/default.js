const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')
const checkToken = require('./../token')

global.Headers = fetch.Headers

// baloo!
router.post('/',
    async function (req, res) {
        console.log(req.body.event.message)
        console.log(req.body.event.channel)
        res.sendStatus(200)
        // only listen on channel az-alert
        if (req.body.event.channel == "GGT3BCHDZ") {
            // if baloo is mentioned by name
            if (req.body.event.type === "app_mention") {
                postMessage({
                    "text": "Hi, <@" + req.body.event.user + ">!",
                    "channel": "GGT3BCHDZ"
                })
            }
        }
    }
)

// new alert
router.post('/alert',
    function (req, res) {
        const valid = (checkToken(req.token))
        if (valid == true) {
            postMessage({
                "text": "<!channel> (" + req.body.countError + ") " + req.body.errorType + " error on " + req.body.appName + " at " + req.body.time,
                "channel": "GGT3BCHDZ"
            })
            res.status(200).end()
        } else res.status(403).end()
    }
)

// client error
router.post('/clientError',
    function (req, res) {
        const valid = (checkToken(req.token))
        if (valid == true) {
            postMessage({
                "text": "_" + req.body.errorMessage + "_",
                "channel": "GGT3BCHDZ"
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
                    "text": "*Provisioning* '" + req.body.service + "' -- a new " + req.body.type + " service",
                    "channel": "GGT3BCHDZ"
                })
            }
            if (req.body.activity == "Deployment") {
                postMessage({
                    "text": "*Deploying* " + req.body.service,
                    "channel": "GGT3BCHDZ"
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