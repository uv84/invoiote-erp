const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({

  email: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
  },
  name: { type: String, required: true },
  surname: { type: String },
  photo: {
    type: String,
    trim: true,
  },
  created: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('User', UserSchema);
