let database = require('../../../DB/index');
let {LIMIT, TABLES} = require('../../const');
let {USERS} = TABLES;
let AppError = require('../../errors/index');
let errorMessages = require('../../errors/errorMessages');

module.exports = function (req, res, next) {
    let query = `SELECT  ${USERS}.* FROM ${USERS} LIMIT ${LIMIT.USERS}`;

    database.query(query).then(([rows]) => {
        console.log(rows);
        res.ans.merge({data: rows});
        next()
    }).catch(next);
};