const express = require("express");
const authRoutes = express.Router();
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");
const uploadCloud = require('../config/cloudinary.js');

//import User.js model
const User = require('../models/User')
const Collection = require('../models/Collection')
const Materials = require('../models/Materials')

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


function checkCategory(category) {
  return function(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('/login')
    }
  }
}
authRoutes.get('/signup-designer', (req, res, next) => {
  res.render('auth-views/signup-designer')
})

authRoutes.get('/signup-user', (req, res, next) => {
  res.render('auth-views/signup-user')
})

authRoutes.post('/signup-designer', uploadCloud.single('profilepic'), (req, res, next) => {
  console.log('DEBUG - req.body', req.body)

  const email = req.body.email;
  const password = req.body.password;
  const fullname = req.body.fullname
  //const category = 'designer';
  const currentLocation = req.body.currentLocation;
  const about = req.body.about;
  const profilePicturePath = req.file.url;
  const profilePictureName = req.file.originalname;
  

  if (email === "" || password === "") {
    res.render('auth-views/signup-designer', { message: 'Indicate user name and password' })
    return;
  }
  User.findOne({ email:email }).then(user => {
    if (user !== null) {
      res.render('auth-views/signup-designer', { message: 'The username already exists' })
      return
    }
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      password: hashPass,
      fullname: fullname,
      email: email,
      //category:category,
      currentLocation:currentLocation,
      about:about,
      profilePicturePath:profilePicturePath,
      profilePictureName:profilePictureName
    })

    console.log('DEBUG - newUser', newUser)

    newUser.save()
    .then(()=> {
    console.log('DEBUG - newUser', newUser)

      req.login(newUser, () => {
        res.redirect('/designer')
      })
    })
    .catch((err) => {
        res.render('auth-views/signup-user', {
        message: 'Something went wrong, please try again later.'
        })
      })


    // newUser.save((err) => {
    //   if (err) {
    //     res.render('auth-views/signup', {
    //       message: 'Something went wrong, please try again later.'
    //     })
    //   } else {
    //     res.redirect('/login')
    //   }
    // })
  })
})

/* --------- v Sign-up seller v ---------- */

authRoutes.post('/signup-user', uploadCloud.single('profilepic'), (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const fullname = req.body.fullname
  const category = 'seller'
  const currentLocation = req.body.currentLocation;
  const about = req.body.about;
  const profilePicturePath = req.file.url;
  const profilePictureName = req.file.originalname;
  

  if (email === "" || password === "") {
    res.render('auth-views/signup-user', { message: 'Indicate user name and password' })
    return;
  }
  User.findOne({ email:email }).then(user => {
    if (user !== null) {
      res.render('auth-views/signup-user', { message: 'The username already exists' })
      return
    }
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      password: hashPass,
      fullname: fullname,
      email: email,
      category:category,
      currentLocation:currentLocation,
      about:about,
      profilePicturePath:profilePicturePath,
      profilePictureName:profilePictureName
    })
    newUser.save((err) => {
      if (err) {
        res.render('auth-views/signup-user', {
          message: 'Something went wrong, please try again later.'
        })
      } else {
        res.redirect('/sellClothesForm')
      }
    })
  })
})

/* --------- ^ Sign-up seller ^ ---------- */



authRoutes.get('/login',(req,res)=>{
  res.render('auth-views/login')
})

authRoutes.post("/login", passport.authenticate("local", {
  successRedirect: "/designer",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));
authRoutes.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});
module.exports = authRoutes;