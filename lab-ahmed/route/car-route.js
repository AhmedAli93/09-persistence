'use strict';

const storage = require('../lib/storage.js');
const response = require('../lib/response.js');
const Car = require('../model/car.js');

module.exports = function(router) {
  router.get('/api/car', function(req, res) {
    console.log('req:', req.url.query.id);
    if (req.url.query.id) {
      storage.fetchItem('car', req.url.query.id)
        .then( car => {
          response.sendJSON(res, 200, car);
        })
        .catch( err => {
          console.error(err);
          response.sendText(res, 404, 'route not found');
        });
      return;
    }
  
    response.sendText(res, 400, 'bad request');
  });
  
  router.post('/api/car', function(req, res) {
    try {
      var car = new Car(req.body.name, req.body.content);
      storage.createItem('car', car);
      response.sendJSON(res, 200, car);
    } catch (err) {
      console.error(err);
      response.sendText(res, 400, 'bad request');
    }
  });
};