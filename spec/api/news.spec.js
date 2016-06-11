'use strict';

var server = require('../../lib/server'),
    fails  = require('../helpers').fails,
   request = require('supertest');


describe('News API', ()=>{
  var app;

  beforeEach(()=>{
    app = server.start();
  });

  it('should be exists', (done)=>{
    request(app)
      .get('/news')
      .expect(200)
      .end(fails(done));
  });
});
