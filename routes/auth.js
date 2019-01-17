const express = require("express");
const authRoutes = express.Router();

//import User.js model
const User = require('../models/User')

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

authRoutes.get('/signup', (req, res, next) => {
  res.render('auth-views/signup')
})

authRoutes.post('/signup', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username === "" || password === "") {
    res.render('auth-views/signup', { message: 'Indicate user name and password' })
    return;
  }
  User.findOne({username:username},'_id',(err,existingUser)=>{
    if(err){
        next (err);
        return;
    }
    if(existingUser!==null){
      res.render('auth/signup',{
          errorMessage:`The email ${emailInput} is already in use`
      })
      return;
  }
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username: username,
      password: hashPass
    })
    newUser.save((err) => {
      if (err) {
        res.render('auth-views/signup', {
          message: 'Something went wrong, please try again later.'
        })
      } else {
        res.redirect('/')
      }
    })
  })
})

module.exports = authRoutes;