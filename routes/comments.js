const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments');

router.post('/posts/:id/comments', commentsCtrl.create);
// this below would be the path if you later want to delete a comment...
// router.delete('/posts/:id', commentsCtrl);

module.exports = router;