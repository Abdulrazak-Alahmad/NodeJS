const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller')
const Post = require('../models/post')

router.get('/', controller.post_index)

router.post('/comment/:id',controller.comment_create) 
router.post('/edit-post', controller.editPost)
router.post('/confirm-edit', controller.confirmEdit)
router.get('/:id',controller.post_details)

router.delete('/:id',controller.post_delete)

router.post('/', controller.post_create_post)

module.exports=router;