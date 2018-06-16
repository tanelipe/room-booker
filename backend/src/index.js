/* Node.js packages */
const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
const passport = require('passport')
const expressSession = require('express-session')
/* Custom includes */
const routes = require('./routes/')
/* Include the passport.js which handles the authentications */
const passportExtensions = require('./passport')
/* Express app, router */
const app = express()
const router = express.Router()

/* Application settings */
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/booking-system'
const APP_PORT = process.env.APP_PORT || 8080
const SESSION_SECRET = process.env.SESSION_SECRET || 'Not very secret'

const SESSION_PARAMETERS = {
  secret: SESSION_SECRET,
  resave: true,
  saveUninitialized: false
}
/* Routing the API */

router.get('*', passportExtensions.isUserAuthenticated)

routes(router)
app.use(bodyparser.json())
app.use(expressSession(SESSION_PARAMETERS))
app.use(passport.initialize())
app.use(passport.session())

app.use('/api', router)
app.post('/login', passport.authenticate('login'), (request, response) => {
  response.sendStatus(200)
})
app.get('/logout', (request, response) => {
  request.logout()
  response.sendStatus(200)
})

/* Database connection */
try {
  mongoose.connect(MONGODB_URI)
} catch (error) {
  console.log(error)
}

app.listen(APP_PORT, () => {
  console.log(`Server started on port ${APP_PORT}`)
})
