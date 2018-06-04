let CODE = require('./index').STATUS_CODE;

module.exports = {
  USER_EXIST: [{
      code: CODE.FORBIDDEN,
      message: 'User exist in system'
  }]
};