let sendAnswer = require('./sendAnswer');
let redirectToAuthPage = require('./redirectToAuthPage');

let token = require('./token');
let email = require('./email');
let utils = require('./utils');
let photos = require('./photos');
let friends = require('./friends');

module.exports = {
    token,
    email,
    utils,
    photos,
    friends,
    sendAnswer,
    redirectToAuthPage
};