const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')

global.Headers = fetch.Headers

// baloo!
router.post('/',
    async function (req, res) {
        console.log(req.body)
        res.sendStatus(200)
        if (req.body.event.channel == "GG9K9JYEM") {
            if (req.body.event.type === "app_mention") {
                // create new conversation in mongo here
                // of, if conversation exists, start it from the beginning
                greeting(req.body.event.user)
            }
            if (req.body.event.type === "message" && req.body.event.subtype != 'bot_message') {
                // check to see if conversation exists
                // if so, pick up where left off
                if (req.body.event.text.includes("deploy")) {
                    // write deploy to convo type
                    doWhat('deploy')
                }
                if (req.body.event.text.includes("provision")) {
                    // write provision to convo type
                    doWhat('provision')
                }
                if (req.body.event.text.includes("list")) {
                    // if convo type != null
                    const type = "deploy"
                    listOptions(type)
                }
            }
        } else {
            fourOhThree(req.body.event.channel)
        }
    }
)

const greeting = user => {
    postMessage({
        "text": "Hey, <@" + user + ">! What can I do you for?",
        "channel": "GG9K9JYEM"
    })
}

const fourOhThree = channel => {
    postMessage({
        "text": "Sorry friend, I can't talk here.",
        "channel": channel
    })
}

const doWhat = (action) => {
    postMessage({
        "text": "What would you like to " + action + "?",
        "channel": "GG9K9JYEM"
    })
    postMessage({
        "text": "To see a list of possible resources to " + action + ", type LIST",
        "channel": "GG9K9JYEM"
    })
}

const listOptions = (type) => {
    // get list of resources by type
    // for each, postMessage
    const types = ["AccMobile, DPW Maintenance, IP Help, PGH Supply"]
    types.forEach(app => {
        postMessage({
            "text": app,
            "channel": "GG9K9JYEM"
        })
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