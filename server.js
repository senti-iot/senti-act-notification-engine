#!/usr/bin/env nodejs
process.title = "senti-act-notification-engine"

const dotenv = require('dotenv').config()
if (dotenv.error) {
	console.warn(dotenv.error)
}
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const app = express()
const bodyParser = require('body-parser')
// API endpoint imports
const test = require('./api/test')
const port = process.env.NODE_PORT || 4000

app.use(helmet())
app.use(bodyParser.json())
// app.use(bodyParser.text())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors())

//#region App use endpoints
app.use([test])
//#endregion

//---Start the express server---------------------------------------------------

const startServer = () => {
	app.listen(port, () => {
		console.log('Senti.Act Notification Engine started on port', port)
	}).on('error', (err) => {
		if (err.errno === 'EADDRINUSE') {
			console.log('Service not started, port ' + port + ' is busy')
		} else {
			console.log(err)
		}
	})
}

startServer()
