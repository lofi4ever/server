const express = require('express');
const http = require('http');
const MongoClient = require('mongodb').MongoClient;

/* BD */
const mongoClient = new MongoClient('mongodb://localhost:27017', {useNewUrlParser: true});

mongoClient.connect((err, client) => {
  if(err) return console.log(err);
  const db = client.db('usersdb');
  const collection = db.collection('users');
  let user = {name: "Jules", age: 19};
  // collection.insertOne(user, (err, result) => {
  //   if(err) return console.log(err);
  //   console.log(result.ops);
  //   client.close()
  // });

  // collection.insertMany([{name: 'Alice', age: 21}, {name: 'Charli', age: 27}, {name: 'Tommy', age: 21}], (err, results) => {
  //   //console.log(results);
  //   if(err) return console.log(err);
  //   for (let i = 0; i < results.insertedCount; i++) {
  //     console.log(results.ops[i]['name']);
  //   }
  //   client.close();
  // });

  // collection.find().toArray((err, results) => {
  //   if(err) return console.log(err);
  //   console.log(results);
  //   client.close();
  // });

  let cursor = collection.find();
  cursor.each((err, doc) => {
    if(err) console.log(err);
    if(doc == null) {
      return client.close();
    }
    console.log(doc);
  });

  client.close();

  //console.log(collection.find());
});
/* !BD */

const handler = express();

handler
    .use(express.static(`${__dirname}/public`))
    .get('/', (req, res) => {
        res.sendFile(`${__dirname}/index.html`);
    });

http.createServer(handler)
    .listen(3000, () => console.log('run'));