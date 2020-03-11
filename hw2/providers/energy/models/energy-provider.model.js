const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let EnergyProvider = new Schema({
  _id: {
    type: String
  },
  name: {
    type: String
  },
  coordinates: {
    type: Schema.Types.Mixed
  }
},
{
    collection: 'EnergyProviders'
});

EnergyProvider.index({
    name: 'text',
    category: 'number'
});

module.exports = mongoose.model('EnergyProvider', EnergyProvider);