let sendAnswer = require('./sendAnswer');
let addNewUser = require('./addNewUser');
let addAuthToken = require('./addAuthToken');
let verifyEmail = require('./verifyEmail');
let clearSessionFromResponse = require('./clearSessionFromResponse');
let endVerifyEmail = require('./endVerifyEmail');
let redirectToAuthPage = require('./redirectToAuthPage');
let signInUser = require('./signInUser');

let posts = require('./posts');
let token = require('./token');

module.exports = {
    posts,
    token,
    sendAnswer,
    addNewUser,
    endVerifyEmail,
    redirectToAuthPage,
    signInUser,
    clearSessionFromResponse,
    sendLinkToVerifyEmail: verifyEmail,
    addAuthToken
};