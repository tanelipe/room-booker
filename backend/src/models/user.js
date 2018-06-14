const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('mongoose-unique-validator')

const BCRYPT_SALT_WORK_FACTOR = 10

let UserSchema = new mongoose.Schema({
  username: { type: String, lowercase: true, unique: true },
  password: String,
  email: String,
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  created: { type: Date, required: true }
})
/* Before saving make sure the password is hashed */
UserSchema.pre('save', (user, next) => {
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

UserSchema.methods.comparePassword = function (inputPassword, callback) {
  bcrypt.compare(inputPassword, this.password, (err, matched) => {
    if (err) {
      callback(err)
    } else {
      callback(null, matched)
    }
  })
}

UserSchema.plugin(validator)

module.exports = mongoose.model('User', UserSchema)
