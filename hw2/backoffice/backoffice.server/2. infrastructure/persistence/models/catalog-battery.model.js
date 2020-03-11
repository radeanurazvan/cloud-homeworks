const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CatalogBattery = new Schema({
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
    collection: 'CatalogBatteries'
});

CatalogBattery.index({
    name: 'text'
});

module.exports = mongoose.model('CatalogBattery', CatalogBattery);