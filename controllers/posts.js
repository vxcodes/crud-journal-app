const User = require('../models/post');

module.exports = {
  main,
  index,
  show,
  create,
  new: newPost,
  index,
  delete: deletePost,
  edit: editPost,
  update,
  generated,
  business,
  selfdev,
};

function business(req, res) {
  User.find({}, function (err, posts) {
    res.render('posts/business', { title: 'All Posts', posts, user: req.user });
  });
}

function selfdev(req, res) {
  User.find({}, function (err, posts) {
    res.render('posts/selfdev', { title: 'All Posts', posts, user: req.user });
  });
}

function generated(req, res) {
  User.find({}, function (err, posts) {
    res.render('posts/generated', { title: 'All Posts', posts, user: req.user });
  });
}

function main(req, res) {
  User.find({}, function (err, posts) {
    res.render('index', { title: 'Homepage', posts, user: req.user});
  });
}

function index(req, res) {
  User.find({}, function (err, posts) {
    res.render('posts/index', { title: 'All Posts', posts, user: req.user });
  });
}

function show(req, res) {
  User.findById(req.params.id, function (err, post) {
    res.render('posts/show', {
      title: 'Post Content',
      post,
      postId: req.params.id,
      user: req.user
    });
  });
}

// renders page that allows you to submit a new post. The path is 'posts/new' and the
function newPost(req, res) {
  // res.render('posts/new', { title: 'Add Post' });
  User.find({}, function (err, posts, user) {
    res.render('posts/new', { title: 'Add Post', posts, user: req.user });
  });
}


function create(req, res) {
  // convert nowShowing's checkbox of nothing or "on" to boolean
  req.body.nowTrending = !!req.body.nowTrending;

  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }

  User.create(req.body, function (err, posts) {
    if (err) return res.redirect('/posts/new', {user: req.user, title: 'All posts'});
    res.render('index', {user: req.user, title: "All Posts", posts});
  });
}

function deletePost(req, res) {
  User.findByIdAndDelete(req.params.id, function (err, posts) {
    if (err) return res.redirect('/posts/new');
  });
  res.redirect('index');
}

function editPost(req, res) {
  res.render('posts/edit', {
    title: 'Add Post',
    postId: req.params.id,
    user: req.user
  });
}

function update(req, res) {
  req.body.nowTrending = !!req.body.nowTrending;
  User.findByIdAndUpdate(req.params.id, req.body, function (err, post, user) {
    console.log(post, 'is the post');
    res.redirect('index', {user: req.user});
  });
}
