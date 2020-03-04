var mongoose = require('mongoose');
var slug = require('slug');

var Schema = mongoose.Schema;

var articleSchema = new Schema({
  title: { type: String, required: true},
  slug: String,
  description: { type: String, required: true },
  body: { type: String, required: true },
  tagList: [String],
  favoritesCount: { type: Number, default: 0 },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  favourited: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }]
}, { timestamps: true });

articleSchema.pre('save', function(next) {
  if(this.title && this.isModified('title')) {
    this.slug = slug(this.title)
  }
  next()
})

module.exports = mongoose.model('Article', articleSchema);