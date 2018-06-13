let sendAnswer = require('./sendAnswer');
let addAuthToken = require('./token/addAuthToken');
let clearSessionFromResponse = require('./clearSessionFromResponse');
let redirectToAuthPage = require('./redirectToAuthPage');

let posts = require('./posts');
let token = require('./token');
let user = require('./user');
let comments = require('./comments');
let likes = require('./likes');
let email = require('./email');

module.exports = {
    posts,
    token,
    email,
    user,
    likes,
    comments,
    sendAnswer,
    redirectToAuthPage,
    clearSessionFromResponse,
    addAuthToken
};