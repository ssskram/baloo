const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')

global.Headers = fetch.Headers

// baloo!
router.post('/',
    async function (req, res) {
        let payload = req.body
        console.log(payload)
        res.sendStatus(200)
        fetch('https://slack.com/api/chat.postMessage', {
                method: 'POST',
                headers: new Headers({
                    'Authorization': 'Bearer ' + process.env.BOT_TOKEN,
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify({
                    "text": "Hello <@U29GKE80K>! How are we today?",
                    "channel": "GG9K9JYEM"
                })
            })
    }
)

module.exports = router