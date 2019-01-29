const mongoose     = require('mongoose');

<<<<<<< HEAD:models/Collections.js
const CollectionsSchema = mongoose.Schema({
  designer: mongoose.Schema.Types.ObjectId,
  materialType: {type: String, required: true},
  cost: {type: String, required: true},
  weight: {type: String, required: true},
  description: {type: String, required: true}
  image: {type: String, data: Buffer}
=======
const CollectionSchema = mongoose.Schema({
  materialType: {type: String, enum: ['Cotton', 'Wool', 'Denim', 'Linen', 'Jersey', 'Silk', 'Polycotton' , 'Velvet', 'Synthetics', 'Other'], required: true},
  cost: {type: String, required: true},
  weight: {type: String, required: true},
  owner: { type : mongoose.Schema.Types.ObjectId, ref: 'User' }

>>>>>>> routes:models/Collection.js
})

const Collection = mongoose.model('Collection', CollectionSchema);
module.exports = Collection;