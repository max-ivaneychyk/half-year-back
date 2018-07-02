let database = require('../../../DB/index');
let {TABLES} = require('../../const/index');
let AppError = require('../../errors/index');
let errorMessages = require('../../errors/errorMessages');

module.exports = function (req, res, next) {
    let query = `SELECT email, id, firstName, lastName FROM ${TABLES.USERS}`;

    database.query(query).then(([rows]) => {
        console.log(rows);
        res.ans.merge({data: rows});
        next()
    }).catch(next);
};