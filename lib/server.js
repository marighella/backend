'use strict';
var restify = require('restify'),
    _       = require('underscore'),
    cors    = require('./CORS.js'),
    news    = require('./news.js'),
    skelleton    = require('./skelleton.js'),
    restifyBunyanLogger = require('restify-bunyan-logger'),
    fs      = require('fs'),
    Logger  = require('bunyan');


var ok = function(obj, responseCodeIfOk = 200){
  return (req, res, next) => {
    var promise = obj(req.params);

    promise
    .then((result)=>{
      res.send(responseCodeIfOk, result);
      next();
    })
    .catch(function(err){
      console.error('error:', err);
      res.send(500, err);
      next();
    });
  };
};


exports.start = function(port = 5000, loggerAllRequests = false){
  const server  = restify.createServer({
    name: 'NewsService',
    log: new Logger.createLogger({
      name: "NewsService",
    }),
    key: fs.readFileSync('/etc/ssl/marighella/marighella.key'),
    certificate: fs.readFileSync('/etc/ssl/marighella/marighella.pem')
  });

  cors(restify, server);

  if(loggerAllRequests){
    server.on('after', restifyBunyanLogger());
  }

  server.use(restify.bodyParser({ mapParams: true }));
  server.use(restify.fullResponse());

  server.get('/news', ok(news.list));
  server.get('/news/:id', ok(news.get));
  server.put('/news/:id', ok(news.update));
  server.post('/news', ok(news.save, 201));

  server.get('/skelleton/:organization', ok(skelleton.get));

  server.listen(port);

  return server;
};
