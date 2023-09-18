const express = require('express')
const app = express();
const path = require('path')
const router = express.Router()

router.get('^/$|index(.html)?', (req, res, next) => {
    res.sendFile(path.join(__dirname,'..', 'views', 'index.html'))
})


module.exports = router
