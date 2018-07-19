let tokenService = require('../../utils/token/index');
let constants = require('../../const/index');
let database = require('../../../DB/index');
const {TABLES} = constants;

module.exports = function (req, res, next) {
  let data = res.ans.get().data;
  let session = {
      accessToken: tokenService.encryptToken({id: data.id, email: data.email}),
      refreshToken: tokenService.generateRefreshToken({id: data.id, email: data.email})
  };

  res.ans.merge({session});

  database.query(`UPDATE ${TABLES.USERS} SET refreshToken='${session.refreshToken}' WHERE id=${data.id}`)
  .catch(e => console.log(e));

  next();
};
