const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
    maxLength: 64
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: 7,
    maxLength: 64
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
    maxLength: 256
  }
});

const User = mongoose.model("Users", userSchema);

export {
  User
}