const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Order = new Schema({
  _id: {
    type: String
  },
  batteries: [Schema.Types.Mixed],
  accumulators: [Schema.Types.Mixed],
  customer: {
    type: Schema.Types.Mixed
  },
  placedAt: {
      type: Date
  }
},
{
    collection: 'Orders'
});

Order.index({
    name: 'text'
});

module.exports = mongoose.model('Order', Order);