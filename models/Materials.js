const mongoose     = require('mongoose');

const MaterialsSchema = mongoose.Schema({
<<<<<<< HEAD
  owner: mongoose.Schema.Types.ObjectId,
=======
  //_id: mongoose.Schema.Types.ObjectId,
>>>>>>> routes
  materialType: {type: String, enum: ['Cotton', 'Wool', 'Denim', 'Linen', 'Jersey', 'Silk', 'Polycotton' , 'Velvet', 'Synthetics', 'Other'], required: true},
  cost: {type: String, required: true},
  weight: {type: String, required: true}
})

const Materials = mongoose.model('Materials', MaterialsSchema);
module.exports = Materials;