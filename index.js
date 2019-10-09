const express = require('express');
const http = require('http');

const handler = express();

handler
    .use(express.static(`${__dirname}/public`))
    .get('/', (req, res) => {
        res.sendFile(`${__dirname}/index.html`);
    });

http.createServer(handler)
    .listen(3000, () => console.log('run'));