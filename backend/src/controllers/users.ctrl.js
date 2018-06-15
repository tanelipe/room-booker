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

    console.log(request.body)
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
          return next(error)
        }
        return response.redirect('/')
      })
    } else {
      let error = new Error('Please fill in all the required fields')
      error.status = 400
      return next(error)
    }
  }
}
