'use strict';

const mongoose = require('mongoose');

const News = mongoose.model('news', mongoose.Schema({
	metadata: Object,
  filename: String,
  updated_at: Date,
  created_at: Date
}));

module.exports = {
  save: function(params){
    var model = News(params);

    model.updated_at = model.created_at = new Date();

    model.save();

    return [201, model];
  },

  get: function(params){
    return News.findById(params.id).exec();
  },

  list: function(params){
    return 200;
  },
};
