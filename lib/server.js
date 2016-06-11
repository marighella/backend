'use strict';

var restify = require('restify');


var ok = function(req, res, next){
  res.send(200);
  return next();
};


exports.start = function(){
  var server  = restify.createServer({
    name: 'NewsService',
  })

  server.get('/news', ok);
  server.listen(5000);

  return server;
};
