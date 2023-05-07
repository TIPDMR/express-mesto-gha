const router = require('express').Router();
const {
  getUser, getUserInfo, getAllUsers, updateProfileUser, updateAvatarUser,
} = require('../controllers/users');

router.get('/', getAllUsers);
router.get('/me', getUserInfo);
router.get('/:userId', getUser);
router.patch('/me', updateProfileUser);
router.patch('/me/avatar', updateAvatarUser);

module.exports = router;
