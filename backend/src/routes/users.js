const controller = require('./../controllers/users.ctrl')

module.exports = (router) => {
  router
    .route('/users')
    .get(controller.getUsers)
}
