const User = require('./../models/user')

module.exports = {
  getUsers: (request, response, next) => {
    User.find().exec((error, users) => {
      if (error) {
        response.send(error)
      } else if (!users) {
        response.send(404)
      } else {
        response.send(users)
      }
      next()
    })
  },

  createUser: (request, response, next) => {
    let { username, password, email, firstName, lastName } = request.body
    /* Email is not required */
    email = email || ''

    if (username && password && firstName && lastName) {
      let data = {
        username: username,
        password: password,
        email: email,
        first_name: firstName,
        last_name: lastName,
        created: new Date()
      }
      User.create(data, (error, user) => {
        if (error) {
          const errors = error.errors
          const replyErrors = [ ]
          for (let error in errors) {
            if (errors[error]) {
              replyErrors.push(errors[error].message)
            }
          }
          response.statusMessage = replyErrors
          return response.status(400).end()
        }
        response.sendStatus(201)
      })
    } else {
      let error = new Error('Please fill in all the required fields')
      error.status = 400
      return next(error)
    }
  }
}
