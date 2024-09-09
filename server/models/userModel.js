const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  role: { type: String, default: 'user' },
  profilePicture: { type: String },
  lastLogin: { type: Date },
  status: { type: String, default: 'active' },
  date: { type: Date, default: Date.now },
});

userSchema.pre('save', async (next) => {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  return next();
});

userSchema.methods.matchPassword = async (enteredPassword) => {
  const valid = await bcrypt.compare(enteredPassword, this.password);
  return valid;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
