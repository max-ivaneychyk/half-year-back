let sendAnswer = require('./sendAnswer');
let clearSessionFromResponse = require('./clearSessionFromResponse');
let redirectToAuthPage = require('./redirectToAuthPage');

let token = require('./token');
let user = require('./user');
let likes = require('./likes');
let email = require('./email');
let utils = require('./utils');
let photos = require('./photos');
let friends = require('./friends');

module.exports = {
    token,
    email,
    utils,
    user,
    likes,
    photos,
    friends,
    sendAnswer,
    redirectToAuthPage,
    clearSessionFromResponse
};