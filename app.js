const express = require('express')

const feedRoutes = require('./routes/feed')
const bodyParser = require('body-parser')

const app = express()

// app.use(bodyParser.urlencoded()) /*Thi works when data is submitted through form*/

app.use(bodyParser.json()) /** application/json */

app.use('/feed', feedRoutes)

app.listen(8080, 'localhost', () => console.log('Connnected'))
