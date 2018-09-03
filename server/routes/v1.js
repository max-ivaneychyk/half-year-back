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

router.route('/users/:userId')
    .get(controllers.usersController.getUserById);

router.route('/users/login')
    .post(controllers.usersController.signIn);

router.route('/users/me/avatar')
    .put(controllers.usersController.changeAvatar);

router.route('/test')
    .get(controllers.usersController.test);


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

router.route('/users/walls/:wallId')
.patch(controllers.wallsController.renameWall);

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


router.route('/posts/:postId/comments')
    .get(controllers.commentController.getListCommentsToPost)
    .post(controllers.commentController.addNewCommentUnderPost);

router.route('/posts/comments/:commentId')
//    .put(controllers.commentController.editCommentById)
    .delete(controllers.commentController.deleteComment);
/*
router.route('/users/:userId/comments')
    .get(controllers.commentController.getCommentByUserId);
*/

// Likes 

// GET                      /users/me/likes

// GET|POST                 /posts/:postId/likes
// DELETE                   /posts/:postId/likes/:likesId
//
// GET|POST                 /comments/:postId/likes
// DELETE                   /comments/:postId/likes/:likesId

router.route('/posts/:postId/likes')
    .post(controllers.likesController.setLikeToPost);

router.route('/comments/:commentId/likes')
    .post(controllers.likesController.setLikeToComment);

router.route('/users/me/likes/:likeId')
    .delete(controllers.likesController.deleteLike);

// Friends
router.route('/friends/:friendId')
    .post(controllers.friendsController.addToFriends)
    .delete(controllers.friendsController.deleteFromFriends);

router.route('/conversations/me')
    .get(controllers.conversationController.getListConversations);

router.route('/conversations/:conversationId/messages')
    .get(controllers.conversationController.getListMessagesForConversation);

router.route('/friends/:friendId/conversations')
    .get(controllers.conversationController.getConversationByUser);

router.route('/friends/me')
    .get(controllers.friendsController.getListMyFriends);
router.route('/friends/:userId')
    .get(controllers.friendsController.getListFriendsForUser);
router.route('/friends/invites/me')
    .get(controllers.friendsController.getInvitesToFriends);
router.route('/friends/me/requests')
    .get(controllers.friendsController.getMyRequests);


// Email

// TODO : TOKENS API 
router.route('/verify-email/:token')
    .get(controllers.verifyEmailController.verify);

// refresh token    
router.route('/tokens/authorize')
    .post(controllers.tokenController.refreshToken);
   

module.exports = router;

