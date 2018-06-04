let sendAnswer = require('./sendAnswer');
let addNewUser = require('./addNewUser');
let isAuthUser = require('./isAuthUser');
let addAuthToken = require('./addAuthToken');
let verifyEmail = require('./verifyEmail');
let clearSessionFromResponse = require('./clearSessionFromResponse');
let endVerifyEmail = require('./endVerifyEmail');
let redirectToAuthPage = require('./redirectToAuthPage');
let signInUser = require('./signInUser');

module.exports = {
    sendAnswer,
    addNewUser,
    endVerifyEmail,
    redirectToAuthPage,
    isAuthUser,
    signInUser,
    clearSessionFromResponse,
    sendLinkToVerifyEmail: verifyEmail,
    addAuthToken
};