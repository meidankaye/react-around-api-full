const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ValidationError = require('../utils/validationerror');
const ConflictError = require('../utils/conflicterror');
const NotFoundError = require('../utils/notfounderror');
const AuthorizationError = require('../utils/autherror');
const User = require('../models/user');

const { JWT_SECRET, NODE_ENV } = process.env;

const getUsers = (req, res, next) => {
  User.find({})
    .orFail(() => {
      throw new NotFoundError('User list is empty.');
    })
    .then((users) => res.send(users))
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError('User id not found.');
    })
    .then((currentUser) => {
      res.send(currentUser);
    })
    .catch(next);
};

const getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .orFail(() => {
      throw new NotFoundError('User id not found.');
    })
    .then((user) => res.send(user))
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .orFail(() => new AuthorizationError({ Message: 'Incorrect email or password.' }))
    .then((user) => {
      bcrypt.compare(password, user.password).then((match) => {
        if (!match) {
          throw new AuthorizationError({ Message: 'Incorrect email or password.' });
        }
        const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', { expiresIn: '7d' });
        res.send({ token });
      });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  if (!password) throw new ValidationError('Missing Password.');
  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    })
      .then((newUser) => res.send({
        _id: newUser._id,
        email: newUser.email,
        name: newUser.name,
        about: newUser.about,
        avatar: newUser.avatar,
      }))
      .catch((error) => {
        if (error.code === 11000) {
          next(new ConflictError('User already exists.'));
        } else next(error);
      });
  });
};

const updateUserProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new NotFoundError('User id not found.');
    })
    .then((user) => res.send(user))
    .catch(next);
};

const updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      throw new NotFoundError('User id not found.');
    })
    .then((newAvatar) => res.send(newAvatar))
    .catch(next);
};

module.exports = {
  getUsers,
  getCurrentUser,
  getUserById,
  login,
  createUser,
  updateUserProfile,
  updateUserAvatar,
};
