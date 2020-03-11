const BatteryDefinitionModel = require('../models/battery-definition.model');
const CatalogBatteryModel = require('../models/catalog-battery.model');
const BatteryDefinition = require('../../../3. core/domain/battery/battery-definition');
const CatalogBattery = require('../../../3. core/domain/battery/catalog-battery');

module.exports = class BatteriesRepository {
    async getDefinition(id) {
        const dbDefinition = await BatteryDefinitionModel.findById(id);
        if(!dbDefinition) {
            return null;
        }
        return new BatteryDefinition(dbDefinition._id, dbDefinition.name, dbDefinition.size);
    }

    async getDefinitions() {
        const definitions = await BatteryDefinitionModel.find();
        return definitions.map(x => new BatteryDefinition(x._id, x.name, x.size));
    }

    async getCatalog() {
        const catalog = await CatalogBatteryModel.find();
        return catalog.map(x => new CatalogBattery(x.definition, x.stock, x.price, x._id));
    }

    addDefinition(definition) {
        const dbDefinition = new BatteryDefinitionModel({
            _id: definition.id,
            name: definition.name,
            size: definition.size
        });
        
         return dbDefinition.save();
    }

    deleteDefinition(id) {
        return BatteryDefinitionModel.findByIdAndDelete(id);
    }

    addInCatalog(battery) {
        const dbBattery = new CatalogBatteryModel({
            _id: battery.id,
            definition: {
                id: battery.definition.id,
                name: battery.definition.name,
                size: battery.definition.size
            },
            price: battery.price,
            stock: battery.stock
        });
        
         return dbBattery.save();
    }

    async getCatalogBattery(id) {
        const dbBattery = await CatalogBatteryModel.findById(id);
        if(!dbBattery) {
            return null;
        }

        return new CatalogBattery(dbBattery.definition, dbBattery.stock, dbBattery.price, dbBattery._id);
    }

    updateCatalogBattery(battery) {
        return CatalogBatteryModel.findByIdAndUpdate(battery.id, {
            _id: battery.id,
            definition: battery.definition,
            stock: battery.stock,
            price: battery.price
        });
    }
};