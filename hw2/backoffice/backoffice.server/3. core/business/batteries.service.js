const validator = require('fluent-validator');
const Result = require('../../../../kernel/functional/result');

module.exports = class BatteriesService {
    #repository;
    #bus;

    constructor(repository, bus) {
        this.#repository = repository;
        this.#bus = bus;
    }

    async getDefinitions() {
        const definitions = await this.#repository.getDefinitions();
        return definitions.map(d => ({
            id: d.id,
            name: d.name,
            size: d.size
        }));
    }

    async getCatalog() {
        const catalog = await this.#repository.getCatalog();
        return catalog.map(b => ({
            id: b.id,
            name: b.definition.name,
            size: b.definition.size,
            price: b.price,
            stock: b.stock
        }));
    }

    async deleteDefinition(id) {
        const definition = await this.#repository.getDefinition(id);
        const result = validator()
            .validate(definition).param('definition').isNotNullOrUndefined();

        return Result.fromValidationResult(result)
            .onSuccess(async () => await this.#repository.deleteDefinition(definition.id));
    }

    async promoteDefinition(id, stock, price) {
        const definition = await this.#repository.getDefinition(id);
        const result = validator()
            .validate(definition).param('definition').isNotNullOrUndefined()
            .validate(price).param('price').isPositive()
            .validate(stock).param('stock').isPositive();
        
        return Result.fromValidationResult(result, definition)
            .map(d => d.promote(stock, price))
            .onSuccess(async a => { await this.#repository.addInCatalog(a)})
            .onSuccess(async () => await this.#repository.deleteDefinition(definition.id));
    }

    async changePrice(id, price) {
        const battery = await this.#repository.getCatalogBattery(id);
        const oldPrice = battery ? battery.price : 0;

        const result = validator()
            .validate(battery).param('battery').isNotNullOrUndefined()
            .validate(price).param('price').isPositive();
        
        return Result.fromValidationResult(result)
            .onSuccess(() => battery.changePrice(price))
            .onSuccess(async () => await this.#repository.updateCatalogBattery(battery))
            .onSuccess(() => this.#bus.publish("PRICE_CHANGED", {
                name: battery.name,
                newPrice: battery.price,
                oldPrice
            }));
    }

    async changeStock(id, stock) {
        const battery = await this.#repository.getCatalogBattery(id);
        const oldStock = battery ? battery.stock : 0;

        const result = validator()
            .validate(battery).param('battery').isNotNullOrUndefined()
            .validate(stock).param('stock').isPositive();
        
        return Result.fromValidationResult(result)
            .onSuccess(() => battery.changeStock(stock))
            .onSuccess(async () => await this.#repository.updateCatalogBattery(battery))
            .onSuccess(() => this.#bus.publish("STOCK_CHANGED", {
                name: battery.name,
                newStock: battery.stock,
                oldStock
            }));
    }
}