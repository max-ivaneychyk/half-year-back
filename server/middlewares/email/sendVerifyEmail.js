let emailService = require('../../utils/email');
let constants = require('../../const');
let {server} = require('../../../config/');
let AppError = require('../../errors');
let errorMessages = require('../../errors/errorMessages');


module.exports = function (req, res, next) {
  let {email, token} = req.body;
  let template = `Please click <a href="${server.FULL_PATH}/api/v1/verify-email/${token}">here</a> for verify your account`;

  emailService.sendMail({
      to: [email],
      html: template
  }).then(() => next())
    .catch(() => next(AppError.create(errorMessages.ERROR_SEND_EMAIL)));
};

