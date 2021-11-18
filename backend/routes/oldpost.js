const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const oldpostCtrl = require('../controllers/oldpost');

router.post('/', auth, oldpostCtrl.createPost);
router.get('/', auth, oldpostCtrl.allPosts)
router.delete('/:id', auth, oldpostCtrl.deletePost)

module.exports = router;