const EnergyProvidersService = require('../../3. core/business/energy-providers.service');
const EnergyProvidersRepository = require('../../2. infrastructure/persistence/repositories/energy-providers.repository');

const Router = require('./router');
const router = new Router('/api/energyProviders');

const getDefinitions = router.route('/definitions').get(function (req, res) {
    runOnService(async service => {
        const result = await service.getDefinitions();
        res.status(200).json(result);
    });
});

const getCatalog = router.route('/catalog').get(function (req, res) {
    runOnService(async service => {
        const result = await service.getCatalog();
        res.status(200).json(result);
    });
});

const promoteDefinition = router.route('/definitions/:id').patch(function (req, res) {
    runOnService(async service => {
        const result = await service.promoteDefinition(req.params.id, req.body.pricePerUnit);
        res.status(result.httpCode(200)).json(result.toPlain());
    });
});

const deleteDefinition = router.route('/definitions/:id').delete(function (req, res) {
    runOnService(async service => {
        const result = await service.deleteDefinition(req.params.id);
        res.status(result.httpCode(204)).json(result.toPlain());
    });
});

function runOnService(callback) {
    const service = new EnergyProvidersService(new EnergyProvidersRepository());
    callback(service);
} 

module.exports = [
    getDefinitions,
    getCatalog,
    promoteDefinition,
    deleteDefinition
];