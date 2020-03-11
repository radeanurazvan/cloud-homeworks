const express = require('express');
const validator = require('fluent-validator');
const newUuid = require('uuid/v1');
const response = require('../../../kernel/response/electrik-response');
const MessageBus = require('../../../kernel/messaging/bus');
const queues = require('../../../kernel/messaging/queues');
const config = require('../config');

const EnergyProvider = require('../models/energy-provider.model');

const energyProvidersController = express.Router();

energyProvidersController.route('/').post(function (req, res) {
  const result = validator()
    .validate(req.body.name).param('name').isNotNullOrUndefined()
    .validate(req.body.coordinates).param('coordinates').isNotNullOrUndefined()
    .validate(req.body.coordinates.longitude).param('longitude').isFloat()
    .validate(req.body.coordinates.latitude).param('latitude').isFloat()

  response.toElectrikResponse(result, res, () => {
    const energyProvider = {
      id: newUuid(),
      name: req.body.name,
      coordinates: req.body.coordinates 
    };
    const dbEnergyProvider = new EnergyProvider({
      ...energyProvider,
      _id: energyProvider.id
    });
  
    dbEnergyProvider.save().then(async _ => {
      res.status(201).send();
      await new MessageBus(config).publish(queues.energyProviders, energyProvider);
    });
  });
});

module.exports = energyProvidersController;