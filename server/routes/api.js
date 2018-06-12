const controllers = require('../controllers');
const extendReq = require('../utils/extendRequest');
const express = require('express');
const router = express.Router();

router.use(extendReq);

router.route('/users')
    .post(controllers.usersController.signUp);

router.route('/users/login')
    .post(controllers.usersController.signIn);

router.route('/posts')
    .get(controllers.postController.getList)
    .post(controllers.postController.addNewPost);

router.route('/posts/:id')
    .put(controllers.postController.editPostById)
    .delete(controllers.postController.deletePost);

router.route('/posts/:id/comments')
    .post(controllers.commentController.addNewCommentUnderPost);

router.route('/posts/comments/:commentId')
    .put(controllers.commentController.editCommentById)
    .delete(controllers.commentController.deleteComment);

router.route('/verify-email/:token')
    .get(controllers.verifyEmailController.verify);

module.exports = router;

