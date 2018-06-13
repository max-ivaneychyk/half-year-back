let constants = require('../../const');
const TABLES = constants.TABLES;
let database = require('../../../DB');
let errorMessages = require('../../errors/errorMessages');
let AppError = require('../../errors');

module.exports = function getCommentsForPost (req, res, next) {
    let limit = req.query.limit || 5;
    let postId = req.params.postId;
    let sql = `SELECT ${TABLES.COMMENTS}.*
    FROM ${TABLES.COMMENTS_TO_ENTITIES}
    RIGHT JOIN ${TABLES.COMMENTS} ON ${TABLES.COMMENTS_TO_ENTITIES}.postId = ${postId} 
    AND ${TABLES.COMMENTS_TO_ENTITIES}.commentId = ${TABLES.COMMENTS}.id
    ORDER BY ${TABLES.COMMENTS}.id
    LIMIT ${limit};`

    database.query(sql).then(([rows]) => {
        res.ans.merge({list: rows});
        next();
    }).catch((e) => {
        let err = AppError.create(e);
        next(err);
    })
};