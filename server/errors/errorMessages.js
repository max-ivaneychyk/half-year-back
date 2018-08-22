let CODE = require('../const/index').STATUS_CODE;

const DATABASE_ERROR = 'Database error';
const DATABASE_WARN = 'Database warning';
const EMAIL_SENDER = 'Email service error';
const CLIENT_ERROR = 'Client error';

module.exports = {
  USER_EXIST: {
      code: CODE.FORBIDDEN,
      type: DATABASE_WARN,
      message: 'User exist in system'
  },
  USER_NOT_VERIFIED: {
      code: CODE.FORBIDDEN,
      type: CLIENT_ERROR,
      message: 'Your account not verified, please check your email'
  },
  USER_NOT_FOUNT: {
      code: CODE.NOT_FOUND,
      type: CLIENT_ERROR,
      message: 'User is not exist'
  },
  ERROR_SEND_EMAIL: {
      name: EMAIL_SENDER,
      message: 'Error sending email, please try again, or change email'
  },
  TOKEN_EXPIRED: {
    code: CODE.FORBIDDEN,
    type: CLIENT_ERROR,
    message: 'Token expired',  
    subcode: 403001,
  }  
      
};
