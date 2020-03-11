const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let AccumulatorDefinition = new Schema({
  _id: {
    type: String
  },
  name: {
    type: String
  },
  category: {
      type: Number
  },
  size: {
    type: Number
  }
},
{
    collection: 'AccumulatorDefinitions'
});

AccumulatorDefinition.index({
    name: 'text',
    category: 'number'
});

module.exports = mongoose.model('AccumulatorDefinition', AccumulatorDefinition);