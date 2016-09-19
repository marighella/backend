'use strict';

var server  = require('../../lib/server'),
    news    = require('../../lib/news'),
    fails   = require('../helpers').fails,
    db      = require('../../lib/db').start('jasmine'),
    Promise = require('bluebird'),
    assert  = require("assert"),
    request = require('supertest');


describe('News API', ()=>{
  var app;

  beforeEach(()=>{
    app = server.start(6666);
    db.connection.db.dropDatabase();
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 15000;
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
    var obj  = undefined;

    news.save(data).then(function(obj){
      request(app)
        .get('/news/'+obj.id)
        .expect(function(res) {
          if (!('filename' in res.body)) throw new Error("missing filename key");
          if (!('metadata' in res.body)) throw new Error("missing metadata key");
        })
        .end(fails(done));
    });
  });

  it('should return a list of documents', (done)=>{
    var data = [
      {
       filename: 'arquivo-old.md',
       metadata: {
         created_date: '2014-01-30'
       }
      },
      {
       filename: 'arquivo-new.md',
       metadata: {
         created_date: '2015-01-30'
       }
      }
    ];

    var promises = [];
    data.forEach(function(element, index){
      promises.push(news.save(element));
    });


    Promise.all(promises).then(function(){
      request(app)
        .get('/news')
        .expect(200)
        .end(function(err, res){
          var result = res.body;
          assert.equal(result[0].filename, 'arquivo-new.md');
          assert.equal(result[1].filename, 'arquivo-old.md');
          done();
        });
    });
  });

  it('should update a document', (done)=>{
    var data =
      {
       filename: 'arquivo-old.md',
       metadata: {
         created_date: '2014-01-30'
       },
       body: 'bolacha de coco'
      };

     news.save(data).then(function(obj){
         var newData = {
           body: 'bolacha de chocolate',
           metadata: {
              foo: 'bar'
           }
         };
         request(app)
         .put('/news/'+obj._id)
         .send(newData)
         .expect(200)
         .end(fails(done));
     });
  });
});
