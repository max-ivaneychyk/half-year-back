let CODE = require('../const/index').STATUS_CODE;

const DATABASE_ERROR = 'Database error';
const DATABASE_WARN = 'Database warning';
const EMAIL_SENDER = 'Email service error';
const CLIENT_ERROR = 'Client error';

module.exports = {
  USER_EXIST: {
      code: CODE.FORBIDDEN,
      name: DATABASE_WARN,
      message: 'User exist in system'
  },
  USER_NOT_VERIFIED: {
      code: CODE.FORBIDDEN,
      name: CLIENT_ERROR,
      message: 'Your account not verified, please check your email'
  },
  ERROR_SEND_EMAIL: {
      name: EMAIL_SENDER,
      message: 'Error sending email, please try again, or change email'
  }
};
