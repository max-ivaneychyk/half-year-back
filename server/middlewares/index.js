let sendAnswer = require('./sendAnswer');
let addAuthToken = require('./token/addAuthToken');
let verifyEmail = require('./verifyEmail');
let clearSessionFromResponse = require('./clearSessionFromResponse');
let endVerifyEmail = require('./endVerifyEmail');
let redirectToAuthPage = require('./redirectToAuthPage');

let posts = require('./posts');
let token = require('./token');
let user = require('./user');

module.exports = {
    posts,
    token,
    user,
    sendAnswer,
    endVerifyEmail,
    redirectToAuthPage,
    clearSessionFromResponse,
    sendLinkToVerifyEmail: verifyEmail,
    addAuthToken
};