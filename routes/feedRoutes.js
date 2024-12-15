const express = require('express');
const { getFeed } = require('../controllers/feedController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/', protect, getFeed);

module.exports = router;