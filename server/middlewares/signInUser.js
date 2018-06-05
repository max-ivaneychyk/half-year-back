let database = require('../../DB');
let {RES_DATA, TABLES} = require('../const');
let AppError = require('../errors');
let errorMessages = require('../errors/errorMessages');

module.exports = function (req, res, next) {
    let {email, password} = req.body;
    let query = `SELECT email, id, firstName, lastName, verified FROM ${TABLES.USERS} WHERE email='${email}' AND password='${password}'`;

    database.query(query).then(([rows]) => {
        let data = rows[0];

        if (!data.verified) {
            return next(AppError.create(errorMessages.USER_NOT_VERIFIED))
        }

        res[RES_DATA] = data;

        next()
    }).catch(next);
};
