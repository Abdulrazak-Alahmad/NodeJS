const Post = require('../models/post')
const Comment = require('../models/comments')

const post_index = (req, res) => {
    Post.find().sort({ createdAt: -1 })
        .then((result) => {
            console.log(result);
            res.render('index', { posts: result })
        })
}
const post_details = (req, res) => {
    const id = req.params.id;
    Post.findById(id)
        .then(result => {
            res.render('details', { post: result })
        }).catch(err => { res.status(404) })

}
const post_create_post = (req, res) => {
    const post = new Post(req.body);
    const postLength = req.body.body.split(" ");
    if (postLength.length > 25) {
        post.save()
            .then((result) => {
                res.redirect('/posts');
            })
            .catch((err) => {
                console.log(err)
            })
    }
    else { res.redirect('/posts'); }
}
const post_delete = (req, res) => {
    const id = req.params.id;
    Post.findByIdAndDelete(id)
        .then(result => {

            res.json({
                redirect: '/posts'
            })
        })
        .catch(err => console.log(err))
}

const editPost = (req, res) => {
   Post.findById(req.query.post_id)
        .then( post => {
            res.render('onePost', {
                post: post
            })
        })
        .catch(err => {
            console.log(err)
        })
}
const confirmEdit = (req, res) => {
    Post.findByIdAndUpdate(req.query.post_id, req.body, function(err, newData){
        if(err) throw err

        res.redirect('/')
    })
}










const comment_create = (req, res) => {
   
    // find out which post you are commenting
    const id = req.body.post_id;

                                                        // console.log('id');
                                                        // console.log(id);
                                                        // console.log('req.body.text');
                                                        // console.log(req.body.text);
                                                        // console.log(req.body);
    // get the comment text and record post id
    const comment = new Comment({
        text: req.body.text,
        post: id
    })
    // save comment
    comment.save();
    // get this particular post
    const postRelated = Post.findById(id);
                                                         // console.log('postRelated')
                                                         // console.log(postRelated.schema.obj.comments)
                                                         // console.log('postRelated')
                                                         // push the comment into the post.comments array
    // console.log('postRelated.schema.obj.comments befor |||||||||||||||||||||||||||||||  ') ;
    // console.log(postRelated.schema.obj.comments) ;

    postRelated.schema.obj.comments.push(comment); 
     
    // console.log('postRelated.schema.obj.comments AFTER |||||||||||||||||||||||||||||') ;             /// Here is the mistake ///
    // console.log(postRelated.schema.obj.comments[1].text)  ;   /// the comment         
    console.log(postRelated.schema.obj.comments)  ;            /// Here is the mistake ///
    res.redirect('/posts');
    // save and redirect...
    //  postRelated.schema.obj.comments.save()
    //     .then((result) => {
    //         res.redirect('/posts');
    //     })
    //     .catch((err) => {
    //         console.log('err')
    //     })
    

}


module.exports = {
    post_index,
    post_details,
    post_create_post,
    post_delete,
    editPost,
    confirmEdit
    , comment_create
}