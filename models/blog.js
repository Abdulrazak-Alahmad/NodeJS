const mongoose= require('mongoose');
const Schema =mongoose.Schema;

const blogSchema = new Schema({

snippet: {
    type : String,
    required: true
},
body: {
    type : String,
    required: true}
,
comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }]
},{timestamps:true});
blogSchema.virtual('url').get(function(){
    return '/blogs/' + this._id
 })
 
const Blog = mongoose.model('Blog',blogSchema);
module.exports=Blog;