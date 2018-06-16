const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('mongoose-unique-validator')

const BCRYPT_SALT_WORK_FACTOR = 12

let UserSchema = new mongoose.Schema({
  username: { type: String, lowercase: true, unique: true },
  password: { type: String, required: true },
  email: String,
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  created: { type: Date, required: true }
})
/* Before saving make sure the password is hashed */
UserSchema.pre('save', function (next) {
  const user = this
  /* Check if the password is modified. */
  if (!user.isModified('password')) {
    return next()
  }

  bcrypt.genSalt(BCRYPT_SALT_WORK_FACTOR, (err, salt) => {
    if (err) {
      return next(err)
    }
    /* Hash the password and save the hashed password */
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err)
      }
      user.password = hash
      next()
    })
  })
})

UserSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

UserSchema.statics.authenticate = function (username, password, callback) {
  User.findOne({ username: username }).exec((error, user) => {
    if (error) {
      return callback(error)
    } else if (!user) {
      var err = new Error('User not found')
      err.status = 401
      return callback(err)
    }
    bcrypt.compare(password, user.password, (err, same) => {
      if (err) {
        return callback(err)
      }
      if (same) {
        return callback(null, user)
      } else {
        return callback()
      }
    })
  })
}

UserSchema.plugin(validator)

var User = mongoose.model('User', UserSchema)
module.exports = User
