import { Schema, model } from 'mongoose';
import { genSalt, hash, compare } from 'bcryptjs';

const userSchema = new Schema({
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

// eslint-disable-next-line func-names
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
  return next();
});

// eslint-disable-next-line func-names
userSchema.methods.matchPassword = async function (enteredPassword) {
  const valid = await compare(enteredPassword, this.password);
  return valid;
};

const User = model('User', userSchema);

export default User;
