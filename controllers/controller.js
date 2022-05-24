const Blog = require('../models/blog')
const Comment = require('../models/comments')



const blog_index=(req,res)=>{
    Blog.find().sort({ createdAt: -1 })
        .then((result) => {
           console.log(result);
            res.render('index', { blogs: result })
        })
}

const blog_details =(req,res)=>{
    const id = req.params.id;
    Blog.findById(id)
        .then(result => {
            res.render('details', { blog: result })
        }).catch(err => { res.status(404) })

}

const blog_create_post=(req, res) => {
    const blog = new Blog(req.body);
    const blogLength = req.body.body.split(" ");
    if (blogLength.length>25){
    blog.save()
        .then((result) => {
            res.redirect('/blogs');
        })
        .catch((err) => {
            console.log(err)
        })}
        else{res.redirect('/blogs');}
}

const comment_create= (req, res) => {
   
    // find out which post you are commenting
     const id = req.params.id;
    // get the comment text and record post id
     const comment = new Comment({
     text: req.body.comment,
     post: id
  })
    // save comment
  comment.save();
    // get this particular post
 const postRelated =  Blog.findById(id);
    // push the comment into the post.comments array
 postRelated.comments.push(comment);
    // save and redirect...
  postRelated.save()
 .then((result) => {
    res.redirect('/blogs');
})
.catch((err) => {
    console.log('err')
})

}

const blog_delete = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then(result => {
           
            res.json({
                redirect: '/blogs'
            })
        })
        .catch(err => console.log(err))
}


module.exports={

blog_index,
blog_details,
blog_create_post,
blog_delete
,comment_create

}