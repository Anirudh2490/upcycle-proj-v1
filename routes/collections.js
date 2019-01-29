const express = require("express");
const authRoutes = express.Router();
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");
const User = require('../models/User')
const Collection = require('../models/Collection')
const Materials = require('../models/Materials')

function checkCategory(category) {
  return function(req, res, next) {
    if (req.isAuthenticated() && req.user.category === category) {
      return next();
    } else {
      res.redirect('/login')
    }
  }
} 

authRoutes.get('/viewCollection', checkCategory('designer'), (req, res, next) => {
  Collection.find({owner:req.user._id}).then(collections=>{
    res.render("collections/viewCollection", {collections:collections});
  })
});

module.exports = authRoutes;