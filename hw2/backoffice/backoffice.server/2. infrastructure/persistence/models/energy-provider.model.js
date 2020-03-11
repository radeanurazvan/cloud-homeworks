const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let EnergyProviderDefinition = new Schema({
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
    collection: 'EnergyProviderDefinitions'
});

EnergyProviderDefinition.index({
    name: 'text',
    category: 'number'
});

module.exports = mongoose.model('EnergyProviderDefinition', EnergyProviderDefinition);