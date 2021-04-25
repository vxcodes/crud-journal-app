const express = require('express');
const router = express.Router();
const indexCtrl = require('../controllers/posts')

router.get('/', function(req, res, next){
    res.redirect('/posts');
});

module.exports = router;