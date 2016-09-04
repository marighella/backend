'use strict';
var fs = require('fs');

const mongoose = require('mongoose');

const Skelleton = mongoose.model('skelleton', mongoose.Schema({
  metadata: Object,
  organization: String,
  updated_at: Date,
}));

module.exports = {
  get: function(params){
    var callback = function(doc){
      if( !doc ){
				 return fs.readFileSync('assets/default-skelleton.json', 'utf8');
      }
      console.log('doc:', doc);
      return doc;
    };
    return Skelleton.findOne({ organization: params.organization }).then(callback);
  },
};
