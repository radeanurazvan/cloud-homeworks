const validator = require('fluent-validator');
const Result = require('../../../../kernel/functional/result');
const Order = require('../domain/order/order');

module.exports = class OrdersService {
    #repositories;

    constructor(repositories) {
        this.#repositories = repositories;
    }

    async getAll() {
        const orders = await this.#repositories.orders.getAll();
        return orders.map(o => ({
            id: o.id,
            placedAt: o.placedAt,
            customer: {
                id: o.customer.id,
                name: o.customer.name,
                email: o.customer.email
            },
            batteries: o.batteries.map(b => ({
                quantity: b.quantity,
                battery: {
                    price: b.battery.price,
                    id: b.battery.id,
                    definition: {
                        name: b.battery.definition.name,
                        size: b.battery.definition.size
                    }
                }
            })),
            accumulators: o.accumulators.map(b => ({
                quantity: b.quantity,
                accumulator: {
                    price: b.accumulator.price,
                    id: b.accumulator.id,
                    definition: {
                        name: b.accumulator.definition.name,
                        size: b.accumulator.definition.size,
                        category: b.accumulator.definition.category
                    }
                }
            }))
        }));
    }

    async createOrder(customerId, batteries, accumulators) {
        const customer = await this.#repositories.customers.getCustomer(customerId);
        const orderBatteriesPromises = batteries.map(async (b) => {
            const battery = await this.#repositories.batteries.getCatalogBattery(b.id);
            return {
                battery,
                quantity: b.quantity
            };
        });
        const orderBatteries = await Promise.all(orderBatteriesPromises);

        const orderAccumulatorsPromises = accumulators.map(async (a) => {
            const accumulator = await this.#repositories.accumulators.getCatalogAccumulator(a.id);
            return {
                accumulator,
                quantity: a.quantity
            };
        });
        const orderAccumulators = await Promise.all(orderAccumulatorsPromises);

        const result = validator()
            .validate(customer).param('customer').isNotNullOrUndefined()
            .validate(orderBatteries).param('batteries').passes((x) => !x.some((y) => !y.battery), 'Invalid batteries')
            .validate(orderBatteries).param('batteries').passes((x) => !x.some((y) => y.quantity <= 0), 'Invalid batteries quantity')
            .validate(orderBatteries).param('batteries').passes((x) => !x.some((y) => y.quantity > y.battery.stock), 'Battery overbuy is not allowed')
            .validate(orderAccumulators).param('accumulators').passes((x) => !x.some((y) => !y.accumulator), 'Invalid accumulators')
            .validate(orderAccumulators).param('accumulators').passes((x) => !x.some((y) => y.quantity <= 0), 'Invalid accumulators quantity')
            .validate(orderAccumulators).param('accumulators').passes((x) => !x.some((y) => y.quantity > y.accumulator.stock), 'Accumulator overbuy is not allowed');
        
        return Result.fromValidationResult(result)
            .map(() => new Order(customer, orderBatteries, orderAccumulators))
            .onSuccess(async (o) => { await this.#repositories.orders.addOrder(o); })
            .onSuccess(async () => await this.decreaseBatteriesStock(orderBatteries))
            .onSuccess(async () => await this.decreaseAccumulatorsStock(orderAccumulators));
    }

    async decreaseBatteriesStock(orderBatteries) {
        const promises = orderBatteries.map(async b => {
            console.log("====================================");
            console.log(`Old battery stock: ${b.battery.stock}`);
            b.battery.decreaseStock(b.quantity);
            console.log(`New battery stock: ${b.battery.stock}`);
            console.log("====================================");

            await this.#repositories.batteries.updateCatalogBattery(b.battery);
        });
        await Promise.all(promises);
    }
    
    async decreaseAccumulatorsStock(orderAccumulators) {
        const promises = orderAccumulators.map(async a => {
            console.log("====================================");
            console.log(`Old accumulator stock: ${a.accumulator.stock}`);
            a.accumulator.decreaseStock(a.quantity);
            console.log(`New accumulator stock: ${a.accumulator.stock}`);
            console.log("====================================");

            await this.#repositories.accumulators.updateCatalogAccumulator(a.accumulator);
        });
        await Promise.all(promises);
    }
}