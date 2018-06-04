let emailService = require('../utils/email');
let constants = require('../const/index');


module.exports = function (req, res, next) {
  let email = req.body.email;
  let token = res[constants.RES_DATA].session.accessToken;

  emailService.sendMail({
      to: [email],
      html: `Please click <a href="http://127.0.0.1:3000/api/verify-email/${token}">here</a> for verify your account`
  }).then(() => next())
    .catch(() => next({message: 'Error sending email, please try again, or change email'}));
};


