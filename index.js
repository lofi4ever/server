const express = require('express');
const http = require('http');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

new MongoClient('mongodb://localhost:27017', {useNewUrlParser: true})
  .connect((err, client) => {
    if(err) return console.log(err);
    const db = client.db('test');
    const collection = db.collection('users');
    collection.find({name: "Tom"})
      .each((err, doc) => {
        if(err) return console.log(err);
        //if(doc === null) client.close();
        console.log(doc);
      });

    const handler = express()
      .use(express.static(`${__dirname}/public`))
      .get('/', (_, res) => {
        res.sendFile(`${__dirname}/index.html`);
      })
      .get('/users', jsonParser, (req, res) => {
          let {body} = req;
          console.log(body);
          res.send('response from server');
      });

    http.createServer(handler)
      .listen('3000', () => console.log('Run'));

      client.on('close', () => console.log('Client was closed'));
  });

/* BD */
// const mongoClient = new MongoClient('mongodb://localhost:27017', {useNewUrlParser: true});

// mongoClient.connect((err, client) => {
//   if(err) return console.log(err);
//   const db = client.db('usersdb');
//   const collection = db.collection('users');
//   let user = {name: "Jules", age: 19};
//   // collection.insertOne(user, (err, result) => {
//   //   if(err) return console.log(err);
//   //   console.log(result.ops);
//   //   client.close()
//   // });

//   // collection.insertMany([{name: 'Alice', age: 21}, {name: 'Charli', age: 27}, {name: 'Tommy', age: 21}], (err, results) => {
//   //   //console.log(results);
//   //   if(err) return console.log(err);
//   //   for (let i = 0; i < results.insertedCount; i++) {
//   //     console.log(results.ops[i]['name']);
//   //   }
//   //   client.close();
//   // });

//   // collection.find().toArray((err, results) => {
//   //   if(err) return console.log(err);
//   //   console.log(results);
//   //   client.close();
//   // });

//   let cursor = collection.find();
//   cursor.each((err, doc) => {
//     if(err) console.log(err);
//     if(doc == null) {
//       return client.close();
//     }
//     console.log(doc);
//   });

//   client.close();

//   //console.log(collection.find());
// });
// /* !BD */

//const mongoClient = new MongoClient('mongodb://localhost:27017', {useNewUrlParser: true});;

// mongoClient.connect((err, client) => {
//   if(err) return console.log(err);
//   const db = client.db('test');
//   const collection = db.collection('users');

//   let cursor = collection.find();
//   cursor.each((err, doc) => {
//     if(err) return console.log(err);
//     if(doc === null) {
//       client.close();
//     }
//     console.log(doc);
//   });
// });

// mongoClient.connect((err, client) => {
//   if(err) return console.log(err);
//   const db = client.db('test');
//   const collection = db.collection('users');
//   collection.find({name: "Tom"})
//     .each((err, doc) => {
//         if(err) return console.log(err);
//         if(doc === null) client.close();
//         console.log(doc)
//     });

//   // collection.findOneAndDelete({name: "Tom"}, (err, result) => {
//   //   if(err) return console.log(err);
//   //   console.log(result);
//   // });

//   client.on('close', () => console.log('CLIENT CLOSED'));
// });

// const handler = express();

// handler
//     .use(express.static(`${__dirname}/public`))
//     .get('/', (req, res) => {
//         console.log('page was requested');
//         res.sendFile(`${__dirname}/index.html`);
//     });

// http.createServer(handler)
//     .listen(3000, () => console.log('run'));