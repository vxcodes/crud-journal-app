const mongoose = require('mongoose');
const Schema = mongoose.Schema; // shortcut variable

const commentSchema = new Schema(
  {
    content: String,
  },
  { timestamps: true }
);

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
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
    comments: [commentSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);
