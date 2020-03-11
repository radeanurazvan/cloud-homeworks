const OrderModel = require('../models/order.model');
const Order = require('../../../3. core/domain/order/order');

module.exports = class OrdersRepository {
    async getAll() {
        const orders = await OrderModel.find();
        return orders.map((o) => Order.fromDetails(o._id, o.customer, o.batteries, o.accumulators, o.placedAt));
    }

    addOrder(order) {
        const dbOrder = new OrderModel({
            _id: order.id,
            customer: order.customer,
            batteries: order.batteries,
            accumulators: order.accumulators,
            placedAt: order.placedAt
        });
        
         return dbOrder.save();
    }
};