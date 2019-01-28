const mongoose     = require('mongoose');

const CollectionSchema = mongoose.Schema({
  materialType: {type: String, enum: ['Cotton', 'Wool', 'Denim', 'Linen', 'Jersey', 'Silk', 'Polycotton' , 'Velvet', 'Synthetics', 'Other'], required: true},
  cost: {type: String, required: true},
  weight: {type: String, required: true},
  owner: { type : mongoose.Schema.Types.ObjectId, ref: 'User' }

})

const Collection = mongoose.model('Collection', CollectionSchema);
module.exports = Collection;