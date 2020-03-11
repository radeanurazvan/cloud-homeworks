const CatalogAccumulator = require('./catalog-accumulator');

module.exports = class AccumulatorDefinition {
    #id;
    #name;
    #category;
    #size;

    constructor(id, name, category, size) {
        this.#id = id;
        this.#name = name;
        this.#category = category;
        this.#size = size;
    }

    get id() { return this.#id; }
    get name() { return this.#name; }
    get category() { return this.#category; }
    get size() { return this.#size; }

    promote(stock, price) {
        return new CatalogAccumulator(this, stock, price); 
    }
}
