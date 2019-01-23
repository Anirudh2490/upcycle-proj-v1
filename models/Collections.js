const mongoose     = require('mongoose');

const CollectionsSchema = mongoose.Schema({
  designer: mongoose.Schema.Types.ObjectId,
  materialType: {type: String, required: true},
  cost: {type: String, required: true},
  weight: {type: String, required: true},
  description: {type: String, required: true}
  image: {type: String, data: Buffer}
})

const Materials = mongoose.model('Materials', MaterialsSchema);
module.exports = Materials;