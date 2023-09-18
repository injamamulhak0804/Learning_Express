const express = require('express')
const path = require('path')
const { logEvents } = require('./logEvents')


const errorLogger = (err, req, res, next) => {
    logEvents(`${err.name} ${err.message}`, 'error.txt')
    console.error(`${err.stack}`);
    res.status(500).send(err.message);
    next()
}

module.exports = errorLogger