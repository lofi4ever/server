const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const objectId = require('mongodb').ObjectID;

const jsonParser = bodyParser.json();
const handler = express();
let dbClient;

handler.use(express.static(`${__dirname}/public`));

new MongoClient('mongodb://localhost:27017/', {useNewUrlParser: true})
  .connect((err, client) => {
    if(err) return console.log(err);
    dbClient = client;
    handler.locals.collection = dbClient.db('test').collection('users');
    http.createServer(handler).listen(3000, () => console.log('run'));
  });

handler
  .get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
  })
  .get('/users', (req, res) => {
    req.app.locals.collection.find().toArray((err, result) => {
      if(err) return console.log(err);
      res.send(result);
    });
  })
  .get('/users/:id', (req, res) => {
    let collection = req.app.locals.collection;
    let id = new objectId(req.params.id);
    collection.findOne({_id: id}, (err, result) => {
      if(err) return console.log(err);
      res.send(result);
    });
  })
  .post('/users', jsonParser, (req, res) => {
    let {name, age} = req.body;
    req.app.locals.collection.insertOne({name: name, age: age}, (err, result) => {
      if(err) return console.log(err);
      res.send('' + result.result.ok);
    });
  })
  .delete('/users/:id', (req, res) => {
    req.app.locals.collection.findOneAndDelete({_id: new objectId(req.params.id)}, (err, result) => {
      if(err) return console.log(err);
      res.send(result);
    });
  })
  .put('/users', jsonParser, (req, res) => {
    let {id, name, age} = req.body;
    //console.log(`name: ${name}; age: ${age}`);
    console.log(req.body);
    req.app.locals.collection.findOneAndUpdate({_id: new objectId(id)}, {$set: {name: name, age: age}}, (err, result) => {
      if(err) return console.log(err);
      res.send(result);
    });
  });

process.on('SIGIOT', () => {
  dbClient.close();
  process.exit();
});