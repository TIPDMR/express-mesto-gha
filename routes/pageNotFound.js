const {pageNotFound} = require("../controllers/pageNotFound");
const router = require('express').Router();
router.get('/*', pageNotFound);

module.exports = router;