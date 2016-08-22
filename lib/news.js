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

    return model.save();
  },

  get: function(params){
    return News.findById(params.id);
  },

  list: function(params){
    return News.find({}).sort('-updated_at').exec();
  },
};
