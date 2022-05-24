const mongoose = require('mongoose');
const Schema =mongoose.Schema;
const commentSchema = new Schema({
    text: {
        type: String,
        trim: true,
        required: true
    },

    // each comment can only relates to one blog, so it's not in array
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }
})

module.exports = mongoose.model('Comment', commentSchema);