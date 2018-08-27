let usersController = require('./usersController');
let verifyEmailController = require('./verifyEmailController');
let tokenController = require('./tokenController');
let postController = require('./postController');
let commentController = require('./commentController');
let likesController = require('./likesController');
let photoController = require('./photoController');
let friendsController = require('./friendsController');
let wallsController = require('./wallsController');
let conversationController = require('./conversationController');
let Controller = require('./Controller');

module.exports = {
    usersController,
    verifyEmailController,
    commentController,
    postController,
    likesController,
    tokenController,
    photoController,
    wallsController,
    conversationController,
    friendsController,
    Controller,
};

