const controllers = require('../controllers');
const extendReq = require('../utils/extendRequest');
const express = require('express');
const router = express.Router();

router.use(extendReq);

// Users

// POST|GET             /users
// POST                 /users/login 
// GET                  /users/:userId
// DELETE|PATCH         /users/me

router.route('/users')
    .post(controllers.usersController.signUp)
    .get(controllers.usersController.searchUsers);

router.route('/users/login')
    .post(controllers.usersController.signIn);

router.route('/users/me/avatar')
    .put(controllers.usersController.changeAvatar);


// Posts    

// GET|POST             /users/me/posts 
// GET                  /users/:userId/posts 
// DELETE|PATCH         /users/:userId/posts/:postId 

router.route('/users/walls/:wallId/posts')
.get(controllers.postController.getList)
.post(controllers.postController.addNewPost);


// Walls
router.route('/users/walls')
.post(controllers.wallsController.createWall);

router.route('/users/:userId/posts')
.get(controllers.postController.getList);

router.route('/users/:userId/posts/:postId')
.get(controllers.postController.getPostById)
.put(controllers.postController.editPostById)
.delete(controllers.postController.deletePost);

// Photos

// GET|POST             /users/me/photos 
// DELETE               /users/me/photos/:photoId 
// GET                  /users/:userId/photos 

// GET|POST             /posts/:postId/photos 
// DELETE               /posts/:postId/photos/:photoId

router.route('/photos/upload')
    .post(controllers.photoController.loadPhoto);


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
//
// GET|POST                 /comments/:postId/likes
// DELETE                   /comments/:postId/likes/:likesId

// GET|POST                 /photos/:photoId/likes
// DELETE                   /photos/:photoId/likes/:likesId

router.route('/posts/:postId/likes')
    .post(controllers.likesController.setLikeToPost);

router.route('/comments/:commentId/likes')
    .post(controllers.likesController.setLikeToComment);

router.route('/users/me/likes/:likeId')
    .delete(controllers.likesController.deleteLike);


// Email

// TODO : TOKENS API 
router.route('/verify-email/:token')
    .get(controllers.verifyEmailController.verify);

module.exports = router;

