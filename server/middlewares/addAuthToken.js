let tokenService = require('../utils/token');
let constants = require('../const');

module.exports = function (req, res, next) {
  let email = req.body.email;
  let session = {
      accessToken: tokenService.encryptToken(email)
  };

  res[constants.RES_DATA] = {...res[constants.RES_DATA], session};

  next();
};