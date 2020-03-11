const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Accumulator = new Schema({
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
    collection: 'Accumulators'
});

Accumulator.index({
    name: 'text',
    category: 'number'
});

module.exports = mongoose.model('Accumulator', Accumulator);