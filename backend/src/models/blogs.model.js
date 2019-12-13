// blogs-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
let mongooseScheam = require('mongoose');
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const blogs = new Schema({
    text: { type: String, required: true },
    author: {type: mongooseScheam.Types.ObjectId}
  }, {
    timestamps: true
  });

  return mongooseClient.model('blogs', blogs);
};
