const mongoose     = require('mongoose');

const MaterialsSchema = mongoose.Schema({
  //_id: mongoose.Schema.Types.ObjectId,
  fullname: {type: String, required: true},
  email: {type: String, required: true},
  phone: {type: Number},
  sellingChoice: {type:String, enum: ['Sell my clothes', 'Upcycle clothes into something cool', 'Give the money now, get paid later']},
  message: {type:String},
})
const Materials = mongoose.model('Materials', MaterialsSchema);
module.exports = Materials;