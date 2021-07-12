const Post = require('../models/post');

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
  Post.find({}, function (err, posts) {
    res.render('posts/business', { title: 'All Posts', posts });
  });
}

function selfdev(req, res) {
  Post.find({}, function (err, posts) {
    res.render('posts/selfdev', { title: 'All Posts', posts });
  });
}

function generated(req, res) {
  Post.find({}, function (err, posts) {
    res.render('posts/generated', { title: 'All Posts', posts });
  });
}

function main(req, res) {
  Post.find({}, function (err, posts) {
    res.render('index', { title: 'Homepage', posts });
  });
}

function index(req, res) {
  Post.find({}, function (err, posts) {
    res.render('posts/index', { title: 'All Posts', posts });
  });
}

function show(req, res) {
  Post.findById(req.params.id, function (err, post) {
    res.render('posts/show', {
      title: 'Post Content',
      post,
      postId: req.params.id,
    });
  });
}

// renders page that allows you to submit a new post. The path is 'posts/new' and the
function newPost(req, res) {
  res.render('posts/new', { title: 'Add Post' });
}


function create(req, res) {
  // convert nowShowing's checkbox of nothing or "on" to boolean
  req.body.nowTrending = !!req.body.nowTrending;

  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }

  Post.create(req.body, function (err, post) {
    if (err) return res.redirect('/posts/new');
    res.redirect('index');
  });
}

function deletePost(req, res) {
  Post.findByIdAndDelete(req.params.id, function (err, posts) {
    if (err) return res.redirect('/posts/new');
  });
  res.redirect('index');
}

function editPost(req, res) {
  res.render('posts/edit', {
    title: 'Add Post',
    postId: req.params.id,
  });
}

function update(req, res) {
  req.body.nowTrending = !!req.body.nowTrending;
  Post.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    console.log(post, 'is the post');
    res.redirect('index');
  });
}
