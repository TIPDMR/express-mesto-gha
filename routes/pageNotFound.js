const router = require('express').Router();
const { pageNotFound } = require('../controllers/pageNotFound');

router.get('/*', pageNotFound);

module.exports = router;
