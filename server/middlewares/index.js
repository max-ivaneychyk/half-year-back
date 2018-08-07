let sendAnswer = require('./sendAnswer');
let clearSessionFromResponse = require('./clearSessionFromResponse');
let redirectToAuthPage = require('./redirectToAuthPage');

let token = require('./token');
let user = require('./user');
let comments = require('./comments');
let likes = require('./likes');
let email = require('./email');
let utils = require('./utils');
let photos = require('./photos');
let friends = require('./friends');
let walls = require('./walls');

module.exports = {
    token,
    email,
    utils,
    user,
    likes,
    comments,
    photos,
    walls,
    friends,
    sendAnswer,
    redirectToAuthPage,
    clearSessionFromResponse
};