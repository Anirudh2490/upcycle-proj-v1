// User -> Designer + Seller
//type enum: designer/seller

const mongoose     = require('mongoose');
//const findOrCreate = require('mongoose-findorcreate');
var uniqueValidator = require('mongoose-unique-validator');

const UserSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  category: {type: String, enum: ['Designer', 'Seller']}, //Designer or Seller
  fullname: {type: String, required: true},
  username: {type: String, lowercase: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
  email: {type: String, lowercase: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
  hash: String,
  salt: String,
  profilePicture: Buffer,
  about: String,
  created: { type: Date, default: Date.now}
});

//UserSchema.plugin(findOrCreate);
UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});

const User = mongoose.model('User', UserSchema);
module.exports = User;