'use strict';

var db      = require('mongoose'),
    Promise = require('bluebird');

var url = process.env.DATABASE_URL || 'mongodb://localhost:27017/:dbName';

var connectionOptions = {
  server: { socketOptions: {keepAlive: 120} }
};


exports.start = function(dbName){

  if(dbName){
    url = url.replace(/:dbName/,dbName);
  }else{
    url = url.replace(/:dbName/,'news');
  }

	db.connect(url, connectionOptions);
  db.Promise = Promise;

	var actions = {
		'open': 'Connection to MongoDB successfully opened.',
		'error': 'Failed to connect to MongoDB. Exiting...',
		'disconnected': 'Disconnected from MongoDB.',
		'reconnected': 'Reconnected to MongoDB.'
	};

	db.connection.once('open', function() {
		console.log('Connection to MongoDB successfully opened.');
	});

	db.connection.on('error', function(error) {
		console.error('Failed to connect to MongoDB. Exiting...', error);
		process.exit(1);
	});

	db.connection.on('disconnected', function() {
		console.log('Disconnected from MongoDB.');
	});

	db.connection.on('reconnected', function() {
		console.log('Reconnected to MongoDB.');
	});

  return db;
};
