const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    validate: {
      validator(v) {
        return /(https?:\/\/)(www\.)?[-A-Za-z0-9+&@#/%?=~_|!:,.;]+\.*[.\-A-Za-z0-9+&@#/%=~_|?#]/gm.test(v);
      },
    },
    required: true,
  },
});

module.exports = mongoose.model('user', userSchema);