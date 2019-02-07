const express = require("express");
const authRoutes = express.Router();
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");
const User = require('../models/User')
const Collection = require('../models/Collection')
const Materials = require('../models/Materials')
const uploadCloud = require('../config/cloudinary.js');


function checkCategory(category) {
  return function(req, res, next) {
    if (req.isAuthenticated() && req.user.category === category) {
      return next();
    } else {
      res.redirect('/login')
    }
  }
} 

authRoutes.get('/viewCollection/:collectionId', checkCategory('designer'), (req, res, next) => {
  Collection.findOne({_id:req.params.collectionId}).then(collections=>{
    res.render("collections/viewCollection", {collections:collections});
  })
});

  authRoutes.get('/enterCollection', checkCategory(), (req, res, next) => {
    res.render("collections/enterCollection");
  
});

authRoutes.get('/collectionDetails', checkCategory('designer'), (req, res, next) => {
  res.render("collections/collectionDetails");

});

authRoutes.get('/sellClothesForm', checkCategory('seller'), (req, res, next) => {
  res.render("seller/sellClothesForm");

});


authRoutes.get('/designer', checkCategory(), (req, res, next) => {
  User.findOne({_id:req.user._id}).then((designer)=>{
    Collection.find({owner:req.user._id}).then((collection)=>{
      res.render("collections/designerProfilePrivate", {
        designer:designer,
        collection:collection
        });
      })
    })  
  });

// <------------ All the public views are here ------------------>

authRoutes.get('/collections', (req, res, next) => {
  Collection.find().then(collections=>{
      res.render("collections/publicView/collections",{
        collections:collections,
       });
    })
});




authRoutes.get('/designers', (req, res, next) => {
  res.render("collections/publicView/designerListPage");
});

authRoutes.get('/123', (req, res, next) => {
  res.render("collections/publicView/designerProfileView");
});

authRoutes.get('/test', (req, res, next) => {
  res.render("collections/publicView/testPage");
});
  

authRoutes.get('/collections/:collectionId', (req, res, next) => {
  //res.render("collections/publicView/collections");
  Collection.findOne({_id:req.params.collectionId}).then(collections=>{
  res.render("collections/publicView/collectionPublicView", {collections:collections});
  })  
});

// <------------ End of public views are here ------------------>

authRoutes.post('/enterCollection', uploadCloud.array('collectionPic'),(req,res,next)=>{
  const collectionName = req.body.collectionName;
  const storyBehind = req.body.storyBehind;
  const fabricTypes = req.body.fabricTypes;
  const fabricWeight = req.body.fabricWeight;
  const amount = req.body.amount;
  const collectionPicturePath = req.files.map((f) => f.url);
  const collectionPictureName = req.files.map((f) => f.originalname);

  const newCollection = new Collection({
    collectionName: collectionName,
    storyBehind: storyBehind,
    fabricTypes: fabricTypes,
    fabricWeight:fabricWeight,
    amount:amount,
    owner: req.user._id,
    collectionPicturePath:collectionPicturePath,
    collectionPictureName,collectionPictureName

  })
  
  newCollection.save((err) => {
    if (err) {
      res.render('collections/enterCollection', {
        message: 'Something went wrong, please try again later.'
      })
    } else {
      res.redirect('/designer')
    }
  })
})

module.exports = authRoutes;