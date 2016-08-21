'use strict';

var server = require('../../lib/server'),
    news   = require('../../lib/news'),
    fails  = require('../helpers').fails,
    db     = require('../../lib/db').start('jasmine'),
   request = require('supertest');


describe('News API', ()=>{
  var app;

  beforeEach(()=>{
    app = server.start();
    db.connection.db.dropDatabase();
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
    var json =  {filename: 'arquivo.md', metadata: { created_date: '2014-01-30'}} ;
    request(app)
      .post('/news')
      .send(json)
      .expect(201)
      .end(fails(done));
  });

  it('should return a document', (done)=>{
    var data = {filename: 'arquivo.md', metadata: { created_date: '2014-01-30'}};
    var obj = news.save(data)[1];

    request(app)
      .get('/news/'+obj.id)
      .expect(function(res) {
         if (!('filename' in res.body)) throw new Error("missing filename key");
         if (!('metadata' in res.body)) throw new Error("missing metadata key");

      })
      .end(fails(done));
  });
});
