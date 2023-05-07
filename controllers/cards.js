const Card = require('../models/card');
const { errorHandler } = require('../utils/utils');

module.exports.getAllCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ cards }))
    .catch((err) => errorHandler(err, res, next));
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const { _id } = req.user;

  Card.create({ name, link, owner: _id })
    .then((card) => card.populate('owner'))
    .then((card) => res.status(201).send({ card }))
    .catch((err) => errorHandler(err, res, next));
};

module.exports.deleteCard = (req, res, next) => {
  const _id = req.params.cardId;
  Card.findOneAndDelete({ _id, owner: req.user._id })
    .orFail()
    .then((card) => {
      res.send({ card });
    })
    .catch((err) => errorHandler(err, res, next));
};

module.exports.likeCard = (req, res, next) => {
  const { _id } = req.user;
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: _id } },
    { new: true },
  ).orFail()
    .populate('likes')
    .then((cards) => res.send({ cards }))
    .catch((err) => errorHandler(err, res, next));
};

module.exports.dislikeCard = (req, res, next) => {
  const { _id } = req.user;
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: _id } },
    { new: true },
  ).orFail()
    .then((cards) => res.send({ cards }))
    .catch((err) => errorHandler(err, res, next));
};
