const User = require('../models/post');

module.exports = {
  create,
};
function create(req, res) {
  User.findById(req.params.id, function (err, post) {
    post.comments.push(req.body);
    post.save(function (err) {
      res.redirect(`/posts/${post._id}`);
    });
  });
}
