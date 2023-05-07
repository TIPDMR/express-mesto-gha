const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  login,
  createUser,
} = require('../controllers/users');

router.post('/signin', celebrate({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(2).max(30).required(),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(2).max(30).required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().min(2).pattern(/^(http|https):\/\/[^ "]+$/),
  }),
}), createUser);

module.exports = router;
