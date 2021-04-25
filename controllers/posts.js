const Post = require('../models/post');

module.exports = {
    index,
    show,
    create,
    new: newPost,
    index,
};

function index(req, res){
    Post.find({}, function(err, posts) {
        res.render('posts/index', {title: 'All Posts', posts});
    });
};

function show(req, res){
    Post.findById(req.params.id, function(err, post){
        res.render('posts/show', {title: 'Post Content', post});
    });
};

function newPost(req, res){
    res.render('posts/new', {title: 'Add Post'});
};


function create(req, res) {
    
    for(let key in req.body) {
        if(req.body[key] === '') delete req.body[key];
    };
    
    Post.create(req.body, function(err, post) {
        if(err) return res.redirect('/posts/new');
        res.redirect('/posts');
    });    
};

