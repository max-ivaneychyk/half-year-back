let constants = require('../../const');
const TABLES = constants.TABLES;
let database = require('../../../DB');
let errorMessages = require('../../errors/errorMessages');
let AppError = require('../../errors');

module.exports = function addPost (req, res, next) {
    let sql = `SELECT * FROM ${TABLES.POSTS} LIMIT 10`;

    database.query(sql).then(([rows]) => {
        res.ans.merge({list: rows});
        next();
    }).catch((e) => {
        let err = AppError.create(e);
        next(err);
    })
};
