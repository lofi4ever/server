const express = require('express');
const controllers = require('../controllers/taskController');
const jsonParser = require('body-parser').json();

const route = new express.Router();

route
  .get('/', controllers.list)
  .get('/add', controllers.form)
  .post('/add', jsonParser, controllers.add);

module.exports = route;