const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')

global.Headers = fetch.Headers

// baloo!
router.post('/',
    async function (req, res) {
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
                if (req.body.event.text.includes("LIST")) {
                    // if convo type != null
                    const type = "deploy"
                    listOptions(type)
                }
            }
        }
    }
)

const greeting = user => {
    postMessage({
        "text": "Hey, <@" + user + ">! What can I do you for?",
        "channel": "GG9K9JYEM"
    })
}

const doWhat = (action) => {
    postMessage({
        "text": "What would you like to " + action + "? To see a list of options, type LIST",
        "channel": "GG9K9JYEM"
    })
}

const listOptions = (type) => {
    // get list of resources by type
    // for each, postMessage
    const deploymentTypes = ["AccMobile", "DPW Maintenance", "IP Help", "PGH Supply"]
    const provisionTypes = ["Client application", "API"]
    if (type == 'deploy') {
        deploymentTypes.forEach(app => {
            postMessage({
                "text": app,
                "channel": "GG9K9JYEM"
            })
        })
    }
    if (type == 'provision') {
        provisionTypes.forEach(resource => {
            postMessage({
                "text": resource,
                "channel": "GG9K9JYEM"
            })
        })
    }
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