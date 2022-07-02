const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    validate: {
      validator(v) {
        return /(https?:\/\/)(www\.)?[-A-Za-z0-9+&@#/%?=~_|!:,.;]+\.*[.\-A-Za-z0-9+&@#/%=~_|?#]/gm.test(v);
      },
    },
    required: true,
  },
  owner: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  likes: {
    type: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'user',
      },
    ],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);