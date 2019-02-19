const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')

global.Headers = fetch.Headers

// baloo!
router.post('/',
    async function (req, res) {
        console.log(req.body.challenge)
        res.status(200).send(req.body.challenge)
    }
)

module.exports = router