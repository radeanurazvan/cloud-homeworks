const CatalogEnergyProviderModel = require('../models/catalog-energy-provider.model');
const EnergyProviderDefinitionModel = require('../models/energy-provider.model');
const EnergyProviderDefinition = require('../../../3. core/domain/energy-provider/energy-provider-definition');
const CatalogEnergyProvider = require('../../../3. core/domain/energy-provider/catalog-energy-provider');

module.exports = class EnergyProvidersRepository {
    async getDefinition(id) {
        const dbDefinition = await EnergyProviderDefinitionModel.findById(id);
        if(!dbDefinition) {
            return null;
        }
        return new EnergyProviderDefinition(dbDefinition._id, dbDefinition.name, dbDefinition.coordinates);
    }

    async getDefinitions() {
        const definitions = await EnergyProviderDefinitionModel.find();
        return definitions.map(x => new EnergyProviderDefinition(x._id, x.name, x.coordinates));
    }

    async getCatalog() {
        const catalog = await CatalogEnergyProviderModel.find();
        return catalog.map(x => new CatalogEnergyProvider(x.definition, x.pricePerUnit));
    }

    addDefinition(definition) {
        const dbDefinition = new EnergyProviderDefinitionModel({
            _id: definition.id,
            name: definition.name,
            coordinates: definition.coordinates
        });
        
         return dbDefinition.save();
    }

    deleteDefinition(id) {
        return EnergyProviderDefinitionModel.findByIdAndDelete(id);
    }

    addInCatalog(energyProvider) {
        const dbEnergyProvider = new CatalogEnergyProviderModel({
            _id: energyProvider.id,
            definition: {
                id: energyProvider.definition.id,
                name: energyProvider.definition.name,
                coordinates: energyProvider.definition.coordinates
            },
            pricePerUnit: energyProvider.pricePerUnit,
        });
        
         return dbEnergyProvider.save();
    }
}