let constants = require('../../const');
const TABLES = constants.TABLES;
let database = require('../../../DB');
let errorMessages = require('../../errors/errorMessages');
let AppError = require('../../errors');

module.exports = function getCommentsByUserId (req, res, next) {
    let limit = req.query.limit || 5;
    let id = req.params.id;
    let sql = `SELECT * FROM ${TABLES.COMMENTS}  WHERE ownerId=${id} LIMIT ${limit}`;

    database.query(sql).then(([rows]) => {
        res[constants.RES_DATA] = rows;
        next();
    }).catch((e) => {
        let err = AppError.create(e);
        next(err);
    })
};