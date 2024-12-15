const express = require('express');
const { addComment } = require('../controllers/commentController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/:postId', protect, addComment);

module.exports = router;