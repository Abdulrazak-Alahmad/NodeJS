const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller')
const Blog = require('../models/blog')

router.get('/', controller.blog_index)

router.post('/comment/:id',controller.comment_create) 

router.get('/:id',controller.blog_details)

router.delete('/:id',controller.blog_delete)

router.post('/', controller.blog_create_post)


module.exports=router;