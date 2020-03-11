const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let BatteryDefinition = new Schema({
  _id: {
    type: String
  },
  name: {
    type: String
  },
  size: {
      type: Number
  }
},
{
    collection: 'BatteryDefinitions'
});

BatteryDefinition.index({
    name: 'text'
});

module.exports = mongoose.model('BatteryDefinition', BatteryDefinition);