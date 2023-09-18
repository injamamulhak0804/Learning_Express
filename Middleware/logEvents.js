const express = require('express')
const path = require('path')
const { format } = require('date-fns');
const { v4: uuid } = require('uuid')
const app = express()
const fsPromises = require('fs').promises
const fs = require('fs')


const logEvents = async (message, logName) => {
    const dateTime = `${format(new Date(), 'dd/mm/yyyy\tHH:mm:ss')}`;
    const id = uuid()
    const logItem = `${dateTime} ${id} ${message} \n`;
    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'))
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logName), logItem)
    } catch (err) {
        console.log(console.error(err));
    }

}

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.path}`, 'log.txt')
    console.log(`${req.method}\t${format(new Date(), 'dd/mm/yyyy\tHH:mm:ss') }\t${req.path}`);
    next()
}


module.exports = { logger, logEvents }
