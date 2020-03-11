const express = require('express');
const validator = require('fluent-validator');
const newUuid = require('uuid/v1');
const response = require('../../../kernel/response/electrik-response');
const MessageBus = require('../../../kernel/messaging/bus');
const queues = require('../../../kernel/messaging/queues');
const config = require('../config');

const Accumulator = require('../models/accumulator.model');
const categories = require('../models/accumulator-category');

const accumulatorsController = express.Router();

accumulatorsController.route('/').post(function (req, res) {
  const result = validator()
    .validate(req.body.name).param('name').isNotNullOrUndefined()
    .validate(req.body.size).param('size').isPositive()
    .validate(req.body.category).param('category').isIn(categories.all);

  response.toElectrikResponse(result, res, () => {
    const accumulator = {
      id: newUuid(),
      name: req.body.name,
      size: req.body.size,
      category: req.body.category
    };
    const dbAccumulator = new Accumulator({
      ...accumulator,
      _id: accumulator.id
    });
  
    dbAccumulator.save().then(async _ => {
      res.status(201).send();
      await new MessageBus(config).publish(queues.accumulators, accumulator);
    });
  });
});

module.exports = accumulatorsController;