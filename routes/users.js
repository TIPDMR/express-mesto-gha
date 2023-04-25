const router = require('express').Router();
const {
  getUser, getAllUsers, createUser, updateProfileUser, updateAvatarUser,
} = require('../controllers/users');

router.get('/', getAllUsers);
router.get('/:userId', getUser);
router.post('/', createUser);
router.patch('/me', updateProfileUser);
router.patch('/me/avatar', updateAvatarUser);
module.exports = router;
