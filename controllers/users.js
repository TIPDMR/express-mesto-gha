const User = require('../models/user');
const { errorHandler } = require('../utils/utils');

module.exports.getUser = (req, res) => {
  const { _id } = req.params.userId;

  User.findById({ _id })
    .orFail()
    .then((user) => res.send({ user }))
    .catch((err) => errorHandler(err, res));
};

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .orFail()
    .then((user) => res.send({ user }))
    .catch((err) => errorHandler(err, res));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ user }))
    .catch((err) => errorHandler(err, res));
};

module.exports.updateProfileUser = (req, res) => {
  const { name, about } = req.body;
  const { _id } = req.user._id;

  User.findByIdAndUpdate(_id, { name, about })
    .then((user) => res.send({ user }))
    .catch((err) => errorHandler(err, res));
};

module.exports.updateAvatarUser = (req, res) => {
  const { avatar } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(_id, { avatar })
    .then((user) => res.send({ user }))
    .catch((err) => errorHandler(err, res));
};
