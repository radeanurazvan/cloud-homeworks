const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CatalogEnergyProvider = new Schema({
  _id: {
    type: String
  },
  definition: {
    type: Schema.Types.Mixed
  },
  pricePerUnit: {
    type: Number
},
},
{
    collection: 'CatalogEnergyProviders'
});

CatalogEnergyProvider.index({
    name: 'text'
});

module.exports = mongoose.model('CatalogEnergyProvider', CatalogEnergyProvider);