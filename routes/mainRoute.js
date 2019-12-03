const express = require('express');
const controllers = require('../controllers/mainController');

const mainRoute = new express.Router();

mainRoute
  .get('/', controllers.home)
  .get('/about', controllers.about);

module.exports = mainRoute;