const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Customer = new Schema({
  _id: {
    type: String
  },
  name: {
    type: String
  },
  email: {
      type: String
  },
  isLoyal: {
      type: Boolean
  }
},
{
    collection: 'Customers'
});

Customer.index({
    name: 'text',
    email: 'text'
});

module.exports = mongoose.model('Customer', Customer);