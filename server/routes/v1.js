const controllers = require('../controllers');
const extendReq = require('../utils/extendRequest');
const express = require('express');
const router = express.Router();

router.use(extendReq);

// Users

// POST                 /users
// POST                 /users/login 
// GET                  /users/:userId
// DELETE|PATCH         /users/me

router.route('/users')
    .post(controllers.usersController.signUp);

router.route('/users/login')
    .post(controllers.usersController.signIn);


// Posts    

// GET|POST             /users/me/posts 
// GET|POST             /users/:userId/posts 
// DELETE|PATCH         /users/:userId/posts/:postId 

router.route('/posts')
.get(controllers.postController.getList)
.post(controllers.postController.addNewPost);

router.route('/posts/:postId')
.put(controllers.postController.editPostById)
.delete(controllers.postController.deletePost);

// Photos

// GET|POST             /users/me/photos 
// DELETE               /users/me/photos/:photoId 
// GET                  /users/:userId/photos 

// GET|POST             /posts/:postId/photos 
// DELETE               /posts/:postId/photos/:photoId 


// Comments    
// GET                  /users/me/comments

// GET|POST             /posts/:postId/comments
// DELETE|PUT           /posts/:postId/comments/:commentId

// GET|POST             /photos/:photoId/comments
// DELETE|PUT           /photos/:photoId/comments/:commentId

router.route('/posts/:postId/comments')
    .get(controllers.commentController.getCommentByPostId)
    .post(controllers.commentController.addNewCommentUnderPost);

router.route('/posts/comments/:commentId')
    .put(controllers.commentController.editCommentById)
    .delete(controllers.commentController.deleteComment);

router.route('/users/:ownerId/comments')
    .get(controllers.commentController.getCommentByUserId);


// Likes 

// GET                      /users/me/likes

// GET|POST                 /posts/:postId/likes
// DELETE                   /posts/:postId/likes/:likesId

// GET|POST                 /photos/:photoId/likes
// DELETE                   /photos/:photoId/likes/:likesId

router.route('/posts/:postId/likes')
    .post(controllers.likesController.setLikeToPost);

router.route('/posts/likes/:likeId')
    .delete(controllers.likesController.deleteLikeToPost);


// Email

// TODO : TOKENS API 
router.route('/verify-email/:token')
    .get(controllers.verifyEmailController.verify);

module.exports = router;

