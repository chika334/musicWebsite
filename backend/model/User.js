const mongoose = require("mongoose")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true, 
    min: 6,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique:  true,
    lowercase: true,
    trim: true,
  },
  Hashed_Password: {
    type: String,
    required: true
  }, 
  salt: String,
  role: Number,
  name: String,
  type: String,
}, {timestamp: true})

UserSchema
  .virtual('password')
  .set(function(password) {
    // create temporary variable called _password
    this._password = password;
    // generate salt
    this.salt = this.makeSalt();
    // encryptPassword
    this.Hashed_Password = this.encryptPassword(password)
  })
  .get(function() {
    return this._password
  })

UserSchema.methods = {
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.Hashed_Password;
  },

  encryptPassword: function(password) {
    if (!password) return '';
    try {
      return crypto
            .createHmac('sha1', this.salt)
            .update(password)
            .digest('hex')
    } catch (err) {
      return '';
    }
  },

  generateAuthToken: function() {
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET)
    return token;
  },

  makeSalt: function() {
    return Math.round(new Date().valueOf() * Math.random() + '');
  }
}

const User = mongoose.model('User', UserSchema);

module.exports = User