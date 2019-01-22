const mongoose     = require('mongoose');

const CollectionsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  materialType: {type: String, enum: ['Cotton', 'Wool', 'Denim', 'Linen', 'Jersey', 'Silk', 'Polycotton' , 'Velvet', 'Synthetics', 'Other'], required: true},
  cost: {type: String, required: true},
  weight: {type: String, required: true}
})

const Materials = mongoose.model('Materials', MaterialsSchema);
module.exports = Materials;