const mongoose = require('mongoose');
const Schema = mongoose.Schema; // shortcut variable

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
}, { timestamps: true });


module.exports = mongoose.model('Post', postSchema);

/*
    Model.create() - creates a document
    Model.find() - finds documents
    Model.findById() - finds a document by it's _id property
    Model.findByIdAndUpdate() - finds a document by it's _id property and updates it
    Model.findByIdAndDelete() - delete a document
*/