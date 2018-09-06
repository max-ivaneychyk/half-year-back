let sendAnswer = require('./sendAnswer');
let redirectToAuthPage = require('./redirectToAuthPage');

let token = require('./token');
let email = require('./email');
let utils = require('./utils');

module.exports = {
    token,
    email,
    utils,
    sendAnswer,
    redirectToAuthPage
};