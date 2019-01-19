// User -> Designer + Seller
//type enum: designer/seller

const mongoose     = require('mongoose');
//const findOrCreate = require('mongoose-findorcreate');
// var uniqueValidator = require('mongoose-unique-validator');

const UserSchema = mongoose.Schema({
  //As I am using radiobuttons we dont need to use enum ?
  //category: {type: String, enum: ['Designer', 'Seller']}, //Designer or Seller
  category: {type: String},
  fullname: {type: String, required: true},
  username: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true},
  profilePicture: String,
  about: String,
  created: { type: Date, default: Date.now}
});

//UserSchema.plugin(findOrCreate);
// UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});

const User = mongoose.model('User', UserSchema);
module.exports = User;