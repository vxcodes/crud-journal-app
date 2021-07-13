const express = require('express');
const router = express.Router();
const indexCtrl = require('../controllers/posts');
const passport = require('passport');
const User = require('../models/post');
// const { route } = require('./posts');

router.get('/', function (req, res) {
  User.find({}, function(err,posts,user){
    res.render('posts/index', {
    user: req.user,
    title: 'New',
    posts,
    user: req.user
  })});
});

// login route
router.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));
// callback route - called back/ requested after user logged in
router.get('/oauth2callback', passport.authenticate('google', {
  successRedirect: '/posts',
  failureRedirect: '/'
}));
// logout route
router.get('/logout', function(req, res){
  req.logOut();
  res.redirect('/');
});
module.exports = router;
