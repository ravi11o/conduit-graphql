var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var articleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  slug: String,
  description: String,
  body: String,
  tagList: [String],
  favoritesCount: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Article', articleSchema);