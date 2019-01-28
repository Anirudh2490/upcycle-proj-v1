const express = require("express");
const authRoutes = express.Router();
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");

//import User.js model
const User = require('../models/User')
const Collection = require('../models/Collection')
const Materials = require('../models/Materials')

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
  const email = req.body.email;
  const password = req.body.password;
  const fullname = req.body.fullname
  const category = req.body.category;

  if (email === "" || password === "") {
    res.render('auth-views/signup', { message: 'Indicate user name and password' })
    return;
  }
  User.findOne({ email:email }).then(user => {
    if (user !== null) {
      res.render('auth-views/signup', { message: 'The username already exists' })
      return
    }
    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      password: hashPass,
      fullname: fullname,
      email: email,
      category:category,
    })
    newUser.save((err) => {
      if (err) {
        res.render('auth-views/signup', {
          message: 'Something went wrong, please try again later.'
        })
      } else {
        // res.redirect('/')
        req.login(newUser, () => {
          res.redirect('/private')
        })
        
      }
    })
  })
})

// Login routes

authRoutes.get('/login',(req,res)=>{
  res.render('auth-views/login')
})

 authRoutes.get('/private', ensureLogin.ensureLoggedIn(), (req, res, next) => {
      res.render("user/private", {user: req.user});
 });


authRoutes.get('/collectionDesignerView', checkCategory('designer'), (req, res, next) => {
  console.log(req.user)
  res.render('collections/collectionDesignerView',{user:req.user})
  })

authRoutes.get('/enterCollection', checkCategory('designer'), (req, res, next) => {
    res.render("collections/enterCollection");
  
});

authRoutes.post('/enterCollection',(req,res,next)=>{
  const materialType = req.body.materialType;
  const cost = req.body.cost;
  const weight = req.body.weight;

  const newCollection = new Collection({
    materialType: materialType,
    cost: cost,
    weight: weight,
    owner: req.user._id
  }) 
  newCollection.save((err) => {
    if (err) {
      res.render('auth-views/enterCollection', {
        message: 'Something went wrong, please try again later.'
      })
    } else {
      res.redirect('/private')
    }
  })
  
})

authRoutes.post("/login", passport.authenticate("local", {
  successRedirect: "/private",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));

authRoutes.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});


module.exports = authRoutes;