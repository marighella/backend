'use strict';

const mongoose = require('mongoose');

const News = mongoose.model('news', mongoose.Schema({
  metadata: Object,
  filename: String,
  updated_at: Date,
  created_at: Date,
  body: String
}));

module.exports = {
  save: function(params){
    var model = News(params);

    model.updated_at = model.created_at = new Date();

    return model.save();
  },

  update: function(params){
    var model = News(params);
    var to_update = {
        updated_at: new Date(),
        metadata: model.metadata,
        body: model.body
    };

    return News.findByIdAndUpdate(model._id, { $set: to_update });
  },

  get: function(params){
    return News.findById(params.id);
  },

  list: function(params){
    return News.find({}).sort('-updated_at').exec();
  },
};
