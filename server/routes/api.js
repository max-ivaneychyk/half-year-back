const controllers = require('../controllers');
const extendReq = require('../utils/extendRequest');
const express = require('express');
const router = express.Router();

router.use(extendReq);

// Users
router.route('/users')
    .post(controllers.usersController.signUp);

router.route('/users/login')
    .post(controllers.usersController.signIn);

// Comments    
router.route('/posts/:id/comments')
    .get(controllers.commentController.getCommentByPostId)
    .post(controllers.commentController.addNewCommentUnderPost);

router.route('/posts/comments/:commentId')
    .put(controllers.commentController.editCommentById)
    .delete(controllers.commentController.deleteComment);

router.route('/users/:id/comments')
    .get(controllers.commentController.getCommentByUserId);
// Likes 
router.route('/posts/:postId/likes')
    .post(controllers.likesController.setLikeToPost);

router.route('/posts/likes/:likeId')
    .delete(controllers.likesController.deleteLikeToPost);

// Posts    
router.route('/posts')
    .get(controllers.postController.getList)
    .post(controllers.postController.addNewPost);

router.route('/posts/:id')
    .put(controllers.postController.editPostById)
    .delete(controllers.postController.deletePost);

// Email
router.route('/verify-email/:token')
    .get(controllers.verifyEmailController.verify);

module.exports = router;

