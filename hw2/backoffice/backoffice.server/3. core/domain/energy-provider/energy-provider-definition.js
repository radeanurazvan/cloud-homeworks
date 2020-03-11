const CatalogEnergyProvider = require('./catalog-energy-provider');

module.exports = class EnergyProviderDefinition {
    #id;
    #name;
    #coordinates;

    constructor(id, name, coordinates) {
        this.#id = id;
        this.#name = name;
        this.#coordinates = coordinates;
    }

    get id() { return this.#id; }
    get name() { return this.#name; }
    get coordinates() { return this.#coordinates; }

    promote(pricePerUnit) {
        return new CatalogEnergyProvider(this, pricePerUnit);
    }
}