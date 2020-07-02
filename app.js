const express = require('express')

const feedRoutes = require('./routes/feed')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const { credentials } = require('./utils/credentials')
const path = require('path')

const app = express()

// app.use(bodyParser.urlencoded()) /*This works when data is submitted through form*/

app.use(bodyParser.json()) /** application/json */

app.use('/images', express.static(path.join(__dirname, 'images')))

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, PATCH, DELETE'
	)
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
	next()
})

app.use('/feed', feedRoutes)

// General Express Error Handling middleware
app.use((err, req, res, next) => {
	console.log(err)
	const statusCode = err.statusCode || 500
	const message = err.message

	return res.status(statusCode).json({
		message,
	})
})

// Connecting to DB

console.log(credentials)
mongoose
	.connect(credentials)
	.then((_) => {
		app.listen(8080, 'localhost', () => {
			console.clear()
			console.log('Connnected')
		})
	})
	.catch((err) => console.log(err))
