const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const User = require('./models/user')
passport.serializeUser((user, done) => {
  done(null, user.username)
})
passport.deserializeUser((username, done) => {
  User.findOne({ 'username': username }, (err, user) => {
    done(err, user)
  })
})

const options = {
  passReqToCallback: true
}

passport.use('login', new LocalStrategy(options, (request, username, password, done) => {
  User.findOne({ 'username': username }, (err, user) => {
    if (err) {
      return done(err)
    } else if (!user) {
      let response = {
        'message': 'User not found'
      }
      return done(null, false, response)
    }
    if (!user.validatePassword(password)) {
      let response = {
        'message': 'Invalid password'
      }
      return done(null, false, response)
    }
    return done(null, user)
  })
}))

exports.isUserAuthenticated = (request, response, next) => {
  if (request.isAuthenticated()) {
    return next()
  }
  response.sendStatus(401)
}
