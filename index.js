const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const nunjucks = require('nunjucks');

const mainRoute = require('./routes/mainRoute');
const tasksRoute = require('./routes/taskRoute');

const handler = express();

nunjucks.configure('views', {
  express: handler
});

handler.use(express.static(`${__dirname}/public`));

mongoose.connect('mongodb://localhost:27017', {useNewUrlParser: true}, (err) => {
  if(err) return console.log(err);
  http.createServer(handler)
    .listen(3000, () => console.log('run'));
});

handler
  .use('/tasks', tasksRoute)
  .use('/', mainRoute);