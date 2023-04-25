const router = require('express').Router();
const {
  getUser, getAllUsers, createUser, updateProfileUser, updateAvatarUser,
} = require('../controllers/users');

router.get('/', getAllUsers);
router.get('/:userId', getUser);
router.post('/', createUser);
router.post('/me', updateProfileUser);
router.post('/me/avatar', updateAvatarUser);

module.exports = router;
