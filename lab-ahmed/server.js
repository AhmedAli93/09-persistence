'use strict';

const http = require('http');
const Car = require('./model/car.js');
const Router = require('./lib/router.js');
const carRouter = require('./route/car-route.js');
const storage = require('./lib/storage.js');
const PORT = process.env.PORT || 3000;
const router = new Router();

carRouter(router);

const server = http.createServer(router.route());

server.listen(PORT, () => {
  console.log(`server up: ${PORT}`);
});