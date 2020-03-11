const newUuid = require('uuid/v1');

module.exports = class CatalogEnergyProvider {
    #id;
    #definition;
    #pricePerUnit;

    constructor(definition, pricePerUnit) {
        this.#id = newUuid();
        this.#definition = definition;
        this.#pricePerUnit = pricePerUnit;
    }

    get id() { return this.#id; }
    get definition() { return this.#definition; }
    get pricePerUnit() { return this.#pricePerUnit; }
}