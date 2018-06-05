let database = require('../../DB');
let tokenService = require('../utils/token');
let {TABLES} = require('../const');

module.exports = function (req, res, next) {
    let token = req.params.token;
    let {payload, err} = tokenService.decryptToken(token);
    let query = `UPDATE ${TABLES.USERS} SET verified=1 WHERE email='${payload.email}'`;

    if (!email) {
        return next({message: 'Access token is invalid'})
    }

    database.query(query).then(() => next()).catch(next);
};


