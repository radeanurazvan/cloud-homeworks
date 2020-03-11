const mongoose = require('mongoose');
const MessageBus = require('../../../kernel/messaging/bus');
const Subscriptions = require('../2. infrastructure/providers/subscriptions');
const BatteriesRepository = require('../2. infrastructure/persistence/repositories/batteries.repository');
const AccumulatorsRepository = require('../2. infrastructure/persistence/repositories/accumulators.repository');
const EnergyProvidersRepository = require('../2. infrastructure/persistence/repositories/energy-providers.repository');
const CustomersRepository = require('../2. infrastructure/persistence/repositories/customers.repository');
const config = require('./config');

module.exports = class Bootstrapper {
    async bootsrapAll() {
        await this.bootstrapMongo();
        await this.bootstrapSubscriptions();
    }

    bootstrapMongo() {
        mongoose.Promise = global.Promise;
        return mongoose.connect(config.connectionStrings.mongo, { useNewUrlParser: true })
            .then(() => { console.log('Database is connected'); })
            .catch(err => { console.log('Cannot connect to db ' + err) });
    }

    bootstrapSubscriptions() {
        const bus = new MessageBus(config);
        return new Subscriptions(bus, {
            batteries: new BatteriesRepository(),
            accumulators: new AccumulatorsRepository(),
            energyProviders: new EnergyProvidersRepository(),
            customers: new CustomersRepository()
        }).bootstrap(); 
    }
}