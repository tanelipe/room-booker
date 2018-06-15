/* Node.js packages */
const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
/* Custom includes */
const routes = require('./routes/')
/* Express app, router */
const app = express()
const router = express.Router()

/* Application settings */
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/booking-system'
const APP_PORT = process.env.APP_PORT || 8080

/* Routing the API */
routes(router)
app.use(bodyparser.json())
app.use('/api', router)

/* Database connection */
try {
  mongoose.connect(MONGODB_URI)
} catch (error) {
  console.log(error)
}

app.listen(APP_PORT, () => {
  console.log(`Server started on port ${APP_PORT}`)
})
