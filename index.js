const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const jsonParser = bodyParser.json();
const Schema = mongoose.Schema;

const handler = express();

mongoose.connect('mongodb://localhost:27017', {useNewUrlParser: true}, (err) => {
  if(err) return console.log(err);
  http.createServer(handler)
    .listen(3000, () => console.log('run'));
});
const userSchema = new Schema({
  name: String,
  age: Number
});
const User = mongoose.model('User', userSchema);

handler
  .use(express.static(`${__dirname}/public`))
  .get('/', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
  })
  .get('/users', (req, res) => {
    User.find({}, (err, results) => {
      if(err) return console.log(err);
      res.json(results);
    });
  })
  .get('/users/:id', (req, res) => {
    if(!req.params) res.sendStatus(400);
    User.find({_id: req.params.id})
      .then((doc) => {
        res.json(doc);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(404);
      });
  })
  .post('/users', jsonParser, (req, res) => {
    let user = new User(req.body);
    user.save((err) => {
      if(err) {
        res.send(false);
      } else {
        res.send(true);
      }
    })
  })
  .put('/users', jsonParser, (req, res) => {
    let {id, name, age} = req.body;
    User.findOneAndUpdate(
      {_id: id},
      {
        name: name,
        age: age
      },
      {new: true}
    ).then((result) => {
      res.send(result);
    }).catch((err) => {
      res.send(err);
    });
  });