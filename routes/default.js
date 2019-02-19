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
    }
)

module.exports = router