const mongoose = require("mongoose")
const express = require("express")
const router = express.Router();
const User = require('../model/User');
const auth = require('../middleware/auth');

router.get('/loadUser', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-Hashed_Password -salt');
  res.send(user);
})

router.post("/signup", async (req, res) => {
  await User.findOne({email: req.body.email}).exec((err, user) => {
    if(user) {
      return res.status(400).json({
        msg: "Email is taken"
      })
    }
    const {username, email, password} = req.body
    user = new User({username, email, password})
    
    user.save();
    const token = user.generateAuthToken();
    res.header('x-auth-token', token).json({ user: { username, email }, token, msg: "Signup success! Please signin." });
  })
})

router.post("/signin", (req, res) => {
  const {email, password} = req.body
  User.findOne({email}).exec((err, user) => {
    if(err || !user) {
      return res.status(400).json({
        msg: "User with that email does not exist. Please signup."
      });
    }

    // authenticate
    if(!user.authenticate(password)) {
      return res.status(400).json({
        msg: "Email and Password do not match."
      })
    }

    // generate token
    const token = user.generateAuthToken();
    const { username, email, role } = user
    res.header('x-auth-token', token).json({user: {username, email, role}, token, msg: "success"})
  })
})

module.exports = router