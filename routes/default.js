const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')

global.Headers = fetch.Headers

// baloo!
router.post('/',
    async function (req, res) {
        console.log(req)
        res.status(200)
    }
)

module.exports = router