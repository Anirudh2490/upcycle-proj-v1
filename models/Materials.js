const mongoose     = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const MaterialsSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  materialType: {type: String, enum: ['Denim', 'Cotton', 'Wool', 'Synthetics', 'Other'], required: true},
  cost: {type: String, required: true},
  weight: Boolean
})