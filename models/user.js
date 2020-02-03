const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  username: { type: String, unique: true },
  password: { type: String, required: true},
  bio: String,
  image: String
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if(this.password && this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
    return next();
  }
  next();
});

userSchema.methods.verifyPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
} 

module.exports = mongoose.model('User', userSchema);
