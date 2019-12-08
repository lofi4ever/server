const express = require('express');
const controllers = require('../controllers/taskController');
const jsonParser = require('body-parser').json();

const route = new express.Router();

route
  .get('/', controllers.list)
  .post('/', jsonParser, controllers.create);

module.exports = route;