const express = require('express');
const validator = require('fluent-validator');
const newUuid = require('uuid/v1');
const response = require('../../../kernel/response/electrik-response');
const MessageBus = require('../../../kernel/messaging/bus');
const queues = require('../../../kernel/messaging/queues');
const config = require('../config');
const Battery = require('../models/battery.model');

const batteriesController = express.Router();

batteriesController.route('/').post(function (req, res) {
  const result = validator()
    .validate(req.body.name).param('name').isNotNullOrUndefined()
    .validate(req.body.size).param('size').isPositive();

  response.toElectrikResponse(result, res, () => {
    const battery = {
      id: newUuid(),
      name: req.body.name,
      size: req.body.size
    };
    const dbBattery = new Battery({
      ...battery,
      _id: battery.id
    });
  
    dbBattery.save().then(async _ => {
      res.status(201).send();
      await new MessageBus(config).publish(queues.batteries, battery);
    });
  });
});

module.exports = batteriesController;