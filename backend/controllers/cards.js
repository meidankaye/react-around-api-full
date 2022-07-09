const mongoose = require('mongoose');
const Card = require('../models/card');
const NotFoundError = require('../utils/notfounderror');
const AuthorizationError = require('../utils/autherror');

const getCards = (req, res, next) => {
  Card.find({})
    .orFail(() => {
      throw new NotFoundError('Card list is empty.');
    })
    .then((cards) => res.send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((newCard) => res.send(newCard))
    .catch(next);
};

const deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(mongoose.Types.ObjectId(req.params.cardId))
    .orFail(() => {
      throw new NotFoundError('No card found with that id.');
    })
    .then((card) => {
      if (card.owner.equals(req.user._id)) res.send(card);
      else {
        throw new AuthorizationError(
          'You may not delete cards that do not belong to you.',
        );
      }
    })
    .catch(next);
};

const likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .orFail(() => {
    throw new NotFoundError('No card found with that id.');
  })
  .then((card) => res.send(card))
  .catch(next);

const dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .orFail(() => {
    throw new NotFoundError('No card found with that id.');
  })
  .then((card) => res.send(card))
  .catch(next);

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
