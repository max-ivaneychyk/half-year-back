let tokenService = require('../utils/token');
let constants = require('../const');

module.exports = function (req, res, next) {
  let data = res[constants.RES_DATA];
  let session = {
      accessToken: tokenService.encryptToken(data)
  };

  res[constants.RES_DATA] = {...res[constants.RES_DATA], session};

  next();
};