const mongoose = require('mongoose');
const Card = require('../models/card');

const getCards = (req, res) => {
  Card.find({})
    .orFail(() => {
      const error = new Error('No card found with that id');
      error.statusCode = 404;
      throw error;
    })
    .then((cards) => res.send(cards))
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(400).send({ message: 'NotValid Data' });
      }
      if (error.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'Card not found' });
      } else {
        res
          .status(500)
          .send({ message: 'An error has occurred on the server' });
      }
    });
};

const createCard = (req, res) => {
  Card.create(req.body)
    .then((newCard) => res.send(newCard))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(400).send(error);
      } else {
        res
          .status(500)
          .send({ message: 'An error has occurred on the server' });
      }
    });
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(mongoose.Types.ObjectId(req.params.cardId))
    .orFail(() => {
      const error = new Error('No card found with that id');
      error.statusCode = 404;
      throw error;
    })
    .then((card) => res.send(card))
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(400).send({ message: 'NotValid Data' });
      }
      if (error.name === 'DocumentNotFoundError') {
        res.status(404).send({ message: 'Card not found' });
      } else {
        res
          .status(500)
          .send({ message: 'An error has occurred on the server' });
      }
    });
};

const likeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .then((card) => res.send(card))
  .catch((error) => {
    if (error.name === 'CastError') {
      res.status(400).send({ message: 'NotValid Data' });
    }
    if (error.name === 'DocumentNotFoundError') {
      res.status(404).send({ message: 'Card not found' });
    } else {
      res
        .status(500)
        .send({ message: 'An error has occurred on the server' });
    }
  });

const dislikeCard = (req, res) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .then((card) => res.send(card))
  .catch((error) => {
    if (error.name === 'CastError') {
      res.status(400).send({ message: 'NotValid Data' });
    }
    if (error.name === 'DocumentNotFoundError') {
      res.status(404).send({ message: 'Card not found' });
    } else {
      res
        .status(500)
        .send({ message: 'An error has occurred on the server' });
    }
  });

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
