const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CatalogAccumulator = new Schema({
  _id: {
    type: String
  },
  definition: {
    type: Schema.Types.Mixed
  },
  stock: {
      type: Number
  },
  price: {
    type: Number
},
},
{
    collection: 'CatalogAccumulators'
});

CatalogAccumulator.index({
    name: 'text'
});

module.exports = mongoose.model('CatalogAccumulator', CatalogAccumulator);