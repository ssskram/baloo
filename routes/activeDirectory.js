const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')
const checkToken = require('./../token')

global.Headers = fetch.Headers

// new alert, ad-monitor
router.post('/alert',
    function (req, res) {
        const valid = (checkToken(req.token))
        if (valid == true) {
            postMessage({
                "text": "*ALERT* " + req.body.user + " logged in from " + req.body.country + " at " + req.body.time + "\n Event id: " + req.body.id,
                "channel": "GGZNDPJPJ"
            })
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