const express = require('express');
const validator = require('validator');
const router = express.Router();
const { celebrate, Joi } = require('celebrate');
const auth = require('../middleware/auth');
const {
  getUsers,
  getUserById,
  getCurrentUser,
  login,
  createUser,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');

function validateUrl(string) {
  if (!validator.isURL(string)) {
    throw new Error('Invalid URL');
  }
  return string;
}

router.get('/users', auth, getUsers);
router.get('/users/me', auth, getCurrentUser);
router.get(
  '/users/:id',
  auth,
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().min(24).max(24).required(),
    }),
  }),
  getUserById,
);
router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(2).max(30),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().custom(validateUrl),
    }),
  }),
  createUser,
);
router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
    }),
  }),
  login,
);
router.patch(
  '/users/me',
  auth,
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2),
    }),
  }),
  updateUserProfile,
);
router.patch(
  '/users/me/avatar',
  auth,
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().custom(validateUrl),
    }),
  }),
  updateUserAvatar,
);

module.exports = router;
