const newUuid = require('uuid/v1');

module.exports = class Order {
    #id;
    #customer;
    #batteries;
    #accumulators;
    #placedAt;

    constructor(customer, orderBatteries, orderAccumulators, id = newUuid(), placedAt = new Date()) {
        this.#id = id;
        this.#customer = {
            id: customer.id,
            name: customer.name,
            email: customer.email
        };
        this.#batteries = orderBatteries.map(b => ({
            battery: b.battery.toOrderItem(),
            quantity: b.quantity
        }));
        this.#accumulators = orderAccumulators.map(a => ({
            accumulator: a.accumulator.toOrderItem(),
            quantity: a.quantity
        }));
        this.#placedAt = placedAt;
    }

    static fromDetails(id, customer, batteries, accumulators, placedAt) {
        const order = new Order(customer, [], [], id, placedAt)

        order.#batteries = batteries;
        order.#accumulators = accumulators;

        return order;
    }

    get id() { return this.#id; }
    get customer() { return this.#customer; }
    get batteries() { return this.#batteries; }
    get accumulators() { return this.#accumulators; }
    get placedAt() { return this.#placedAt; }
}