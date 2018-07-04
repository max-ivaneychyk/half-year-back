let sendAnswer = require('./sendAnswer');
let clearSessionFromResponse = require('./clearSessionFromResponse');
let redirectToAuthPage = require('./redirectToAuthPage');

let posts = require('./posts');
let token = require('./token');
let user = require('./user');
let comments = require('./comments');
let likes = require('./likes');
let email = require('./email');
let utils = require('./utils');

module.exports = {
    posts,
    token,
    email,
    utils,
    user,
    likes,
    comments,
    sendAnswer,
    redirectToAuthPage,
    clearSessionFromResponse
};