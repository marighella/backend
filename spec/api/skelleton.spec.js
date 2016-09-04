'use strict';
var server  = require('../../lib/server'),
    fails   = require('../helpers').fails,
    db      = require('../../lib/db').start('jasmine'),
    assert  = require("assert"),
    request = require('supertest');


describe('Sekelleton API', ()=>{
  var app;

  beforeEach(()=>{
    app = server.start(6666);
    db.connection.db.dropDatabase();
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;
  });

  afterEach(()=>{
    app.close();
  });

  it('should return a default skelleton when nothing was found', (done)=>{
    request(app)
      .get('/skelleton/any_organization')
      .expect(function(response){
          var body = response.body;
          var code = response.statusCode;
          assert(JSON.parse(body));
          assert.equal(code, 200);
      })
      .end(fails(done));
  });
});
