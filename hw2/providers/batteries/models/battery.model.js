const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Battery = new Schema({
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
    collection: 'Batteries'
});

Battery.index({
    name: 'text'
});

module.exports = mongoose.model('Battery', Battery);