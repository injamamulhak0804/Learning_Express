const express = require('express')
const app = express();
const path = require('path');
const cors = require('cors')
const PORT = process.env.PORT || 3900
const { logger, logEvents } = require('./Middleware/logEvents')
const errorLogger = require('./Middleware/errorLogger')
const corsOptions = require('./config/corsOption')


////////////Middle Ware ////////////////////

app.use(logger)
app.use(express.json())
app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: false }));
app.use('/', express.static(path.join(__dirname, 'views', 'public')))
///////// Main Page Routed/////////////

app.use('/', require('./routes/mindir'))



//////handling Error Routes //////////////

app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
        logEvents(`${req.url} The path was Not Found!!...`,'error.txt')
        console.log(`${req.url} The path was Not Found!!...`);
    } else if (req.accepts('json')) {
        res.json({ "error": "There is a error" })
    } else {
        res.type("txt").send("Not found")
    }
})


app.use(errorLogger)

app.listen(PORT, () => console.log(`Server is Listening in: ${PORT}`))