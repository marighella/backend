'use strict';
var PORT =  process.env.PORT || 5000;

var restify = require('restify'),
    _       = require('underscore'),
    news    = require('./news.js');


var ok = function(obj){
  if(!!obj){
    return (req, res, next) => {
      var promise = obj(req.params);

      if(promise.then){

        promise
        .then((result)=>{
					res.send(200,result);
					next();
				})
        .catch(function(err){
					res.send(500, err);
					console.error('error:', err);
					next();
				});

      }else{
				var result = _.flatten([promise]);
				res.send(...result);
				return next();
      }
    };
  }

  return (req, res, next) => {
    res.send(200);
    return next();
  };
};


exports.start = function(){
  const server  = restify.createServer({
    name: 'NewsService',
  });

  server.use(restify.bodyParser({ mapParams: true }));

  server.get('/news', ok(news.list));
  server.get('/news/:id', ok(news.get));
  server.post('/news', ok(news.save));

  server.listen(PORT);

  return server;
};
