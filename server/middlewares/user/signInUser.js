let database = require('../../../DB/index');
let {USERS, AUTH} = require('../../const/index').TABLES;
let AppError = require('../../errors/index');
let errorMessages = require('../../errors/errorMessages');

module.exports = function (req, res, next) {
    let {email, password} = req.body;
    let query = `
    SELECT ${USERS}.*, ${AUTH}.verified FROM ${USERS} 
    INNER JOIN ${AUTH} ON ${AUTH}.email='${email}' AND ${AUTH}.password='${password}'AND ${USERS}.id=${AUTH}.id`;

    database.query(query).then(([rows]) => {
        let data = rows[0];

        if (!data) {
            return next(AppError.create(errorMessages.USER_NOT_FOUNT))
        }

        if (!data.verified) {
            return next(AppError.create(errorMessages.USER_NOT_VERIFIED))
        }

        res.ans.merge(data);

        next()
    }).catch(next);
};

