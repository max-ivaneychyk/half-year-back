let tokenService = require('../../utils/token/index');
let constants = require('../../const/index');
let database = require('../../../DB/index')
const {TABLES} = constants;

module.exports = function (req, res, next) {
  let data = res.ans.get();
  let session = {
      accessToken: tokenService.encryptToken(data),
      refreshToken: tokenService.generateRefreshToken(data)
  };

  res.ans.merge({session});

  database.query(`UPDATE ${TABLES.USERS} SET refreshToken='${session.refreshToken}' WHERE id=${data.id}`)
  .then(s => console.log(s))
  .catch(e => console.log(e));

  next();
};
