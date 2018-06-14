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
  }
}
