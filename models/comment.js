var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commemtSchema = new Schema({
  body: {type: String, required: true},
  article: {
    type: Schema.Types.ObjectId,
    ref: 'Article',
    required: true
  }
}, {timestamps: true });

module.exports = mongoose.model('Comment', commemtSchema);