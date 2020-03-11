const validator = require('fluent-validator');
const Result = require('../../../../kernel/functional/result');

module.exports = class EnergyProvidersService {
    #repository;

    constructor(repository) {
        this.#repository = repository;
    }

    async getDefinitions() {
        const definitions = await this.#repository.getDefinitions();
        return definitions.map(d => ({
            id: d.id,
            name: d.name,
            coordinates: d.coordinates
        }));
    }

    async getCatalog() {
        const catalog = await this.#repository.getCatalog();
        return catalog.map(b => ({
            id: b.id,
            name: b.definition.name,
            coordinates: b.definition.coordinates,
            pricePerUnit: b.pricePerUnit,
        }));
    }

    async deleteDefinition(id) {
        const definition = await this.#repository.getDefinition(id);
        const result = validator()
            .validate(definition).param('definition').isNotNullOrUndefined();

        return Result.fromValidationResult(result, definition)
            .onSuccess(async () => await this.#repository.deleteDefinition(definition.id));
    }

    async promoteDefinition(id, pricePerUnit) {
        const definition = await this.#repository.getDefinition(id);
        const result = validator()
            .validate(definition).param('definition').isNotNullOrUndefined()
            .validate(pricePerUnit).param('pricePerUnit').isPositive();
        
        return Result.fromValidationResult(result, definition)
            .map(d => d.promote(pricePerUnit))
            .onSuccess(async ep => { await this.#repository.addInCatalog(ep)})
            .onSuccess(async () => await this.#repository.deleteDefinition(definition.id));
    }
}