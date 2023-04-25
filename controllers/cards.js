const Card = require('../models/card');
const { errorHandler } = require('../utils/utils');

module.exports.getAllCards = (req, res) => {
  Card.find()
    .orFail()
    .then((cards) => res.send({ cards }))
    .catch((err) => errorHandler(err, res));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const { _id } = req.user;

  Card.create({ name, link, owner: _id })
    .then((card) => card.populate('owner'))
    .then((card) => res.send({ card }))
    .catch((err) => errorHandler(err, res));
};

module.exports.deleteCard = (req, res) => {
  const _id = req.params.cardId;
  console.log(_id);
  Card.findByIdAndDelete({ _id })
    .then((cards) => res.send({ cards }))
    .catch((err) => errorHandler(err, res));
};

module.exports.likeCard = (req, res) => {
  const { _id } = req.user;
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: _id } },
    { new: true, runValidators: true },
  ).orFail()
    .populate('likes')
    .then((cards) => res.send({ cards }))
    .catch((err) => errorHandler(err, res));
};

module.exports.dislikeCard = (req, res) => {
  const { _id } = req.user;
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: _id } },
    { new: true, runValidators: true },
  ).orFail()
    .then((cards) => res.send({ cards }))
    .catch((err) => errorHandler(err, res));
};
