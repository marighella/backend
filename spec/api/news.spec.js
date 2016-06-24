'use strict';

var server = require('../../lib/server'),
    fails  = require('../helpers').fails,
   request = require('supertest');


describe('News API', ()=>{
  var app;

  beforeEach(()=>{
    app = server.start();
  });

  afterEach(()=>{
    app.close();
  });

  it('should be alive', (done)=>{
    request(app)
      .get('/news')
      .expect(200)
      .end(fails(done));
  });

  it('should save a document', (done)=>{
    var json = JSON.stringify({filename: 'arquivo.md', metadata: { created_date: '2014-01-30'}});
    request(app)
      .post('/news')
      .send(json)
      .expect(201)
      .end(fails(done));
  });

  it('should return a document', (done)=>{
    var json = JSON.stringify({filename: 'arquivo.md', metadata: { created_date: '2014-01-30'}});
    request(app)
      .get('/news/1')
      .expect(200,json)
      .end(fails(done));
  });
});
