const controllers = require('../controllers');
const extendReq = require('../utils/extendRequest');
const express = require('express');
const router = express.Router();

router.use(extendReq);

// Users
router.route('/users')
    .post(controllers.usersController.signUp)
    .get(controllers.usersController.searchUsers);

router.route('/users/:userId')
    .get(controllers.usersController.getUserById);

router.route('/users/reset-password')
    .post(controllers.usersController.resetPassword);

router.route('/users/login')
    .post(controllers.usersController.signIn);

router.route('/users/me/avatar')
    .put(controllers.usersController.changeAvatar);

router.route('/users/me/info')
    .put(controllers.usersController.setAdditionalInfo);

router.route('/users/:userId/info')
    .get(controllers.usersController.userFullInfoById);

router.route('/users/me/status')
    .patch(controllers.usersController.updateStatus);

// Walls
router.route('/users/walls')
    .post(controllers.wallsController.createWall);

router.route('/users/walls/:wallId')
    .patch(controllers.wallsController.renameWall)
    .delete(controllers.wallsController.deleteWall);

// Posts
router.route('/users/walls/:wallId/posts')
    .get(controllers.postController.getList)
    .post(controllers.postController.addNewPost);

router.route('/users/:userId/posts')
    .get(controllers.postController.getList);

router.route('/users/:userId/posts/:postId')
    .get(controllers.postController.getPostById)
    .put(controllers.postController.editPostById)
    .delete(controllers.postController.deletePost);

// Photos
router.route('/photos/upload')
    .post(controllers.photoController.loadPhoto);


// Comments    
router.route('/posts/:postId/comments')
    .get(controllers.commentController.getListCommentsToPost)
    .post(controllers.commentController.addNewCommentUnderPost);

router.route('/posts/comments/:commentId')
    .delete(controllers.commentController.deleteComment);

// Likes 
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

router.route('/friends/me')
    .get(controllers.friendsController.getListMyFriends);

router.route('/users/:userId/friends/')
    .get(controllers.friendsController.getListFriendsForUser);
router.route('/friends/invites/me')
    .get(controllers.friendsController.getInvitesToFriends);
router.route('/friends/me/requests')
    .get(controllers.friendsController.getMyRequests);

// Chats    
router.route('/conversations/me')
    .get(controllers.conversationController.getListConversations);

router.route('/conversations/:conversationId/messages')
    .get(controllers.conversationController.getListMessagesForConversation);

router.route('/friends/:friendId/conversations')
    .get(controllers.conversationController.getConversationByUser);


router.route('/friends/me')
    .get(controllers.friendsController.getListMyFriends);
router.route('/users/:userId/friends')
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