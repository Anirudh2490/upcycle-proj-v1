const mongoose     = require('mongoose');

const MaterialsSchema = mongoose.Schema({
  //_id: mongoose.Schema.Types.ObjectId,
  fullname: {type: String, required: true},
  email: {type: String, required: true},
  phone: {type: Number},
  fabricTypes: {type: String, enum: ['Cotton', 'Wool', 'Denim', 'Linen', 'Jersey', 'Silk', 'Polycotton' , 'Velvet', 'Synthetics', 'Other'], required: true},
  fabricWeight: {type: String, required: true},
  message: {type:String},
  designer: { type : mongoose.Schema.Types.ObjectId, ref: 'User' },
  offerPicturePath: [],
  offerPictureName: []
})
const Materials = mongoose.model('Materials', MaterialsSchema);
module.exports = Materials;