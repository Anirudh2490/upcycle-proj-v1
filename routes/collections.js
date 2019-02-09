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

//This view no longer exists
// authRoutes.get('/viewCollection/:collectionId', checkCategory('designer'), (req, res, next) => {
//   Collection.findOne({_id:req.params.collectionId}).then(collections=>{
//     res.render("collections/viewCollection", {collections:collections});
//   })
// });

  authRoutes.get('/enterCollection', checkCategory(), (req, res, next) => {
    res.render("collections/enterCollection");
});

//This view no longer exists
// authRoutes.get('/collectionDetails', checkCategory('designer'), (req, res, next) => {
//   res.render("collections/collectionDetails");

// });

authRoutes.get('/sellClothesForm', (req, res, next) => {
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
  Collection.find()
    .populate('owner')
    .then(collections=>{
      res.render("collections/publicView/collections",{
        collections: collections,
        });
      })
});

authRoutes.get('/collections/:userId', (req, res, next) => {
  User.findOne({_id:req.params.userId}).then(user=>{
    Collection.find({owner:req.params.userId}).then((collection)=>{
      res.render("collections/publicView/designer", {user:user, collection:collection});
    })
  })
});

/* <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.0.0/jquery.min.js"></script>
<script>
  $(function()){
    var form = $(".submit-bid");
    form.submit(function(event){
      //Capture .requiredQuantity .unitPrice .sellQty
        const fabric = $(".fabric").text();
        let requiredQuantity = parseFloat($(".requiredQuantity").text());
        let unitPrice = parseFloat($(".unitPrice").text());
        let sellQty = parseFloat($(".sellQty").val());
        $.post(
          "/views/seller/sellerClothes.hbs",
          {
            fabric:fabric,
            requiredQuantity:requiredQuantity,
            unitPrice:unitPrice,
            sellQty:sellQty
          }
        )
    })
  }
</script>  */

authRoutes.post('/sellClothesForm', (req, res, next)=>{
  console.log(req.body);
  res.render('seller/sellClothesForm')
  
})


// authRoutes.get('/designer', checkCategory(), (req, res, next) => {
//   User.findOne({_id:req.user._id}).then((designer)=>{
//     Collection.find({owner:req.user._id}).then((collection)=>{
//       res.render("collections/designerProfilePrivate", {
//         designer:designer,
//         collection:collection
//         });
//       })
//     })  
//   });



authRoutes.get('/designers', (req, res, next) => {
  res.render("collections/publicView/designerListPage");
});


// THIS VIEW NO LONGER EXISTS
// authRoutes.get('/123', (req, res, next) => {
//   res.render("collections/publicView/designer");
// });

// THIS VIEW NO LONGER EXISTS
// authRoutes.get('/test', (req, res, next) => {
//   res.render("collections/publicView/testPage");
// });
  
// THIS VIEW NO LONGER EXISTS
// authRoutes.get('/collections/:collectionId', (req, res, next) => {
//   //res.render("collections/publicView/collections");
//   Collection.findOne({_id:req.params.collectionId}).then(collections=>{
//   res.render("collections/publicView/collectionPublicView", {collections:collections});
//   })  
// });




// <------------ End of public views are here ------------------>
//below is the info that's posted from 
authRoutes.post('/views/collections/designerProfilePrivate.hbs', uploadCloud.array('collectionPic'),(req,res,next)=>{
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
    collectionPictureName:collectionPictureName

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


authRoutes.post('/sellClothesForm', uploadCloud.array('sellerForm'),(req,res,next)=>{
  const fullname = req.body.name;
  const phone = req.body.phone;
  const email = req.body.email;
  const amount = req.body.amount;
  const fabricTypes = req.body.fabricTypes;
  const fabricWeight = req.body.fabricWeight;
  const message = req.body.message;
  const offerPicturePath = req.files.map((f) => f.url);
  const offerPictureName = req.files.map((f) => f.originalname);

  const newSeller = new Materials({
    fullname: fullname,
    email:email,
    phone: phone,
    fabricTypes:fabricTypes,
    fabricWeight:fabricWeight,
    amount:amount,
    //designer: req.user._id,
    offerPicturePath:offerPicturePath,
    offerPictureName:offerPictureName
  })

  newSeller.save((err) => {
    if (err) {
      res.render('seller/sellClothesForm', {
        message: 'Something went wrong, please try again later.'
      })
    } else {
      res.redirect('/designer')
   }
  })
})




//  //_id: mongoose.Schema.Types.ObjectId,
//  fullname: {type: String, required: true},
//  email: {type: String, required: true},
//  phone: {type: Number},
//  sellingChoice: {type:String, enum: ['Sell my clothes', 'Upcycle clothes into something cool', 'Give the money now, get paid later']},
//  message: {type:String},
//  offerPicturePath: [],
//  offerPictureName: []
// })

module.exports = authRoutes;


