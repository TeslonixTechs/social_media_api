const upload = require('../middlewares/uploadMiddleware');

router.post('/profile-picture', protect, upload.single('profilePicture'), uploadProfilePicture);
router.post('/:id/follow', protect, followUser);