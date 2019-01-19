const express = require("express");
const authRoutes = express.Router();
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");

//import User.js model
const User = require('../models/User')

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


function checkCategory(category) {
  return function(req, res, next) {
    if (req.isAuthenticated() && req.user.category === category) {
      return next();
    } else {
      res.redirect('/login')
    }
  }
}

// Signup routes

authRoutes.get('/signup', (req, res, next) => {
  res.render('auth-views/signup')
})

authRoutes.post('/signup', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const category = req.body.category;

  if (username === "" || password === "") {
    res.render('auth-views/signup', { message: 'Indicate user name and password' })
    return;
  }
  User.findOne({ username:username }).then(user => {
    if (user !== null) {
      res.render('auth-views/signup', { message: 'The username already exists' })
      return
    }
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username: username,
      password: hashPass,
      fullname: "Joe",
      email: username,
      category:category,
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

// Login routes

authRoutes.get('/login',(req,res)=>{
  res.render('auth-views/login')
})

authRoutes.get('/private', ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("auth-views/private", {user: req.user});
});

// authRoutes.get('/private', ensureLogin.ensureLoggedIn(), checkCategory('seller'), (req, res) => {
//   res.render("auth-views/private", {user: req.user});
// });

authRoutes.post("/login", passport.authenticate("local", {
  successRedirect: "/private",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));

// authRoutes.get("/private", ensureLogin.ensureLoggedIn(), (req, res) => {
//     res.render("auth-views/private", { user: req.user });
// });

authRoutes.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});


module.exports = authRoutes;