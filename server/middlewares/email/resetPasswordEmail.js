let emailService = require('../../utils/email');
let constants = require('../../const');
let {server} = require('../../../config/');
let AppError = require('../../errors');
let errorMessages = require('../../errors/errorMessages');


module.exports = function (req, res, next) {
    let {email, token, password} = req.body;
    let template = `Please click <a href="${server.FULL_PATH}/api/v1/users/confirm-reset-password/${token}">here</a> for confirm new  password ${password}` ;

    emailService.sendMail({
        to: [email],
        html: template
    }).then(() => next())
        .catch(() => next(AppError.create(errorMessages.ERROR_SEND_EMAIL)));
};