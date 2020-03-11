const CatalogBattery = require('./catalog-battery');

module.exports = class BatteryDefinition {
    #id;
    #name;
    #size;

    constructor(id, name, size) {
        this.#id = id;
        this.#name = name;
        this.#size = size;
    }

    get id() { return this.#id; }
    get name() { return this.#name; }
    get size() { return this.#size; }

    promote(stock, price) {
        return new CatalogBattery(this, stock, price); 
    }
}
