let tokenService = require('../../utils/token/index');
let constants = require('../../const/index');

module.exports = function (req, res, next) {
  let data = res[constants.RES_DATA];
  let session = {
      accessToken: tokenService.encryptToken(data),
      refreshToken: tokenService.generateRefreshToken(data)
  };

  res[constants.RES_DATA] = {...res[constants.RES_DATA], session};

  next();
};
