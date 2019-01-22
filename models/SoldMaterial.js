//Material that is sold by the user

const mongoose     = require('mongoose');

const MaterialsSchema = mongoose.Schema({
  sellerID: mongoose.Schema.Types.ObjectId,
  materialType: {type: String, enum: ['Cotton', 'Wool', 'Denim', 'Linen', 'Jersey', 'Silk', 'Polycotton' , 'Velvet', 'Synthetics', 'Other'], required: true},
  weight: {type: String, required: true},
  
})

const Materials = mongoose.model('Materials', MaterialsSchema);
module.exports = Materials;