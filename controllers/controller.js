const Post = require('../models/post')
const Comment = require('../models/comments')
const mongoose = require('mongoose');
const post_index =async (req, res) => {
    let result=[];

    const allQuestions=await Post.find().sort({ createdAt: -1 })
    
    allQuestions.forEach(post => {
        
        result.push({post});

    })  
     res.render('index', {posts:result});
}


const post_details =async (req, res) => {

try {
    
        const result= await Post.findById(mongoose.Types.ObjectId(req.params.id));
        
        if(result) {
            //Find all answers belong to the selected question
            Comment.find({post:result}).populate('post').sort({updatedAt: -1})
                .then(answers => {
                    console.log('we are here ');
                    res.status(200).render('details',{post:result,answers:answers, postid:true});
                })                
                .catch(err => {
                    res.status(500).send(err);
                } )
        }
                
        else {
           
            res.status(400).send('Oop... record your want to find does not exist!')
        }
    }
    catch(err) {
        
        res.status(400).send('Oop... 1record your want to find does not exist!')

    }   

}
const post_create_post = (req, res) => {
    const post = new Post(req.body);
    // const postLength = req.body.body.split(" ");
    // if (postLength.length > 25) {
        post.save()
            .then((result) => {
                res.redirect('/posts');
            })
            .catch((err) => {
                console.log(err)
            })
    // }
    // else { res.redirect('/posts'); }
}

const post_delete = (req, res) => {
    const id = req.params.id;
    Post.findByIdAndDelete(id)
        .then(() => {
console.log('first done')
            Comment.deleteMany({post:mongoose.Types.ObjectId(id)})
            .then(() => {
                console.log('second done')
                res.json({
                    redirect: '/posts'
                })
            })
            .catch(err => {
                res.status(500).send(err);

            })

            
        })
        .catch(err => console.log(err))
}

const editPost = (req, res) => {
    Post.findById(req.query.post_id)
        .then(post => {
            res.render('onePost', {
                post: post
            })
        })
        .catch(err => {
            console.log(err)
        })
}
const confirmEdit = (req, res) => {
    Post.findByIdAndUpdate(req.query.post_id, req.body, function (err, newData) {
        if (err) throw err

        res.redirect('/')
    })
}


const comment_create = async (req, res) => {

    // find out which post you are commenting
    const id = req.params.id;
    const answer =req.body.text;
    console.log(req.params);
    console.log(req.body.text);
    const post = await Post.findById(id);
    const newAnswer=new Comment({text:answer, post: post});
    newAnswer.save()
    .then((result) => {
        console.log(result);
        console.log('done')
        res.status(200).redirect('/');
    })
    .catch(err => {
       console.log(err)
    }) 


}


module.exports = {
    post_index,
    post_details,
    post_create_post,
    post_delete,
    editPost,
    confirmEdit,
    comment_create
}