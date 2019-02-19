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
        if (req.body.event.channel == "GG9K9JYEM") {
            greeting(req.body.event.user)
        } else {
            fourOhThree(req.body.event.channel)
        }
    }
)

const greeting = user => {
    postMessage({
        "text": "Hello, <@" + user + ">! What can I do you for?",
        "channel": "GG9K9JYEM"
    })
}

const fourOhThree = channel => {
    postMessage({
        "text": "Sorry friend, I can't talk here.",
        "channel": channel
    })
}

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