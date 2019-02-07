// User -> Designer + Seller
//type enum: designer/seller

const mongoose     = require('mongoose');
//const findOrCreate = require('mongoose-findorcreate');
// var uniqueValidator = require('mongoose-unique-validator');

const UserSchema = mongoose.Schema({
  //category: {type: String, enum: ['designer', 'seller']}, //Designer or Seller
  fullname: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  currentLocation: String,
  profilePicturePath: String,
  profilePictureName:String,
  about: String,
  created: { type: Date, default: Date.now}
});

//UserSchema.plugin(findOrCreate);
// UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});

const User = mongoose.model('User', UserSchema);
module.exports = User;