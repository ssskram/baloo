const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')

global.Headers = fetch.Headers

// baloo!
router.post('/',
    async function (req, res) {
        console.log(req)
        console.log(req.body)
        console.log(req.challenge)
        res.status(200).send('holla')
    }
)

module.exports = router