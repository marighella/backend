'use strict';

var restify = require('restify'),
    _       = require('underscore'),
    news    = require('./news.js');


var ok = function(obj){
  if(!!obj){
    return (req, res, next) => {
      var result = _.flatten([obj(req.params)]);
      console.log(result);
      res.send(...result);
      return next();
    };
  }

  return (req, res, next) => {
    res.send(200);
    return next();
  };
};


exports.start = function(){
  var server  = restify.createServer({
    name: 'NewsService',
  })

  server.get('/news', ok(news.list));
  server.get('/news/:id', ok(news.get));
  server.post('/news', ok(news.save));
  server.listen(5000);

  return server;
};
