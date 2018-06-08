let database = require('../../../DB/index');
let {RES_DATA, TABLES} = require('../../const/index');
let AppError = require('../../errors/index');
let errorMessages = require('../../errors/errorMessages');

module.exports = function (req, res, next) {
    let {email, password} = req.body;
    let query = `SELECT email, id, firstName, lastName, verified FROM ${TABLES.USERS} WHERE email='${email}' AND password='${password}'`;

    database.query(query).then(([rows]) => {
        let data = rows[0];

        if (!data.verified) {
            return next(AppError.create(errorMessages.USER_NOT_VERIFIED))
        }

        database.query(`UPDATE ${TABLES.USERS} SET refreshToken='${res[RES_DATA].session.refreshToken}' WHERE id=${data.id}`)
                .then(s => console.log(s))
                .catch(e => console.log(e));

        res[RES_DATA] = {...data, ...res[RES_DATA]};

        next()
    }).catch(next);
};

