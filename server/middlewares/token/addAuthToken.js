let tokenService = require('../../utils/token/index');
let constants = require('../../const/index');
let database = require('../../../DB/index');
const {TABLES} = constants;

module.exports = function (req, res, next) {
    let data = req.ans.get().data;
    let sql = `UPDATE ${TABLES.AUTH} SET refreshToken=? WHERE id=? `;
    let session = {
        accessToken: tokenService.encryptToken({id: data.id, email: data.email}),
        refreshToken: tokenService.generateRefreshToken({id: data.id, email: data.email})
    };

    req.ans.merge({session});

    database.query(sql, [session.refreshToken, data.id])
        .then(() => next())
        .catch(e => console.log(e));

};
