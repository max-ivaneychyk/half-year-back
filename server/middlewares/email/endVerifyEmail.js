let database = require('../../../DB');
let {TABLES} = require('../../const');

module.exports = function (req, res, next) {
    let token = req.params.token;
    let query = `UPDATE ${TABLES.AUTH} SET verified=1 WHERE refreshToken='${token}'`;

    database.query(query).then(() => {
        next()
    }).catch(next);
};


