const mongoose= require('mongoose');
const Schema =mongoose.Schema;
const postSchema = new Schema({

snippet: {
    type : String,
    required: true
},
body: {
    type : String,
    required: true
}

},{timestamps:true});

// postSchema.virtual('url').get(function(){
//     return '/posts/' + this._id
//  })
 
const Post = mongoose.model('post',postSchema);
module.exports=Post;

