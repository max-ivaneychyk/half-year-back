let constants = require('../../const');
const TABLES = constants.TABLES;
let database = require('../../../DB');
let errorMessages = require('../../errors/errorMessages');
let AppError = require('../../errors');

module.exports = function  (req, res, next) {
    let sql = `SELECT * FROM ${TABLES.POSTS} WHERE id = ? ;`;
    let placeholder = [res.ans.get().id];

    database.query(sql, placeholder).then(([rows]) => {
        res.ans.merge(rows[0]);
        next();
    }).catch((e) => {
        let err = AppError.create(e);
        next(err);
    })
};