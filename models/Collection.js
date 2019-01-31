const mongoose     = require('mongoose');

const CollectionSchema = mongoose.Schema({
  collectionName:{type: String, required:true},
  storyBehind:{type:String, required:true},
  fabricTypes: {type: String, enum: ['Cotton', 'Wool', 'Denim', 'Linen', 'Jersey', 'Silk', 'Polycotton' , 'Velvet', 'Synthetics', 'Other'], required: true},
  fabricWeight: {type: String, required: true},
  amount: {type: String, required: true},
  owner: { type : mongoose.Schema.Types.ObjectId, ref: 'User' },
  collectionPicturePath: String,
  collectionPictureName:String,
})

const Collection = mongoose.model('Collection', CollectionSchema);
module.exports = Collection;