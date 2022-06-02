const mongoose = require('mongoose');
const Schema =mongoose.Schema;
const Post= require('./post')
const commentSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    // each comment can only relates to one blog, so it's not in array
    post: {
        type: Schema.Types.ObjectId,
        ref: Post
    }
}, { timestamps:true})
module.exports = mongoose.model('Comment', commentSchema);