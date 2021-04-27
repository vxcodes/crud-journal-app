const mongoose = require('mongoose');
const Schema = mongoose.Schema; // shortcut variable

const commentSchema = new Schema({
    comment: String,
    like: {
        type: Boolean,
        default: false,
    },
}, {timestamps: true});

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    keywords: {
        type: String,
        required: true,
    },
    nowTrending: {
        type: Boolean,
        default: false,
    },
    comments: [commentSchema]
}, { timestamps: true });


module.exports = mongoose.model('Post', postSchema);

/*
    Model.create() - creates a document
    Model.find() - finds documents
    Model.findById() - finds a document by it's _id property
    Model.findByIdAndUpdate() - finds a document by it's _id property and updates it
    Model.findByIdAndDelete() - delete a document
*/