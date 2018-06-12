let constants = require('../../const');
const TABLES = constants.TABLES;
let database = require('../../../DB');
let errorMessages = require('../../errors/errorMessages');
let AppError = require('../../errors');

module.exports = function getCommentsForPost (req, res, next) {
    let limit = req.query.limit || 5;
    let idPost = req.params.id;
    let sql = `SELECT ${TABLES.COMMENTS}.*
    FROM ${TABLES.COMMENTS_TO_POSTS}
    RIGHT JOIN ${TABLES.COMMENTS} ON ${TABLES.COMMENTS_TO_POSTS}.postId = ${idPost} 
    AND ${TABLES.COMMENTS_TO_POSTS}.commentId = ${TABLES.COMMENTS}.id
    ORDER BY ${TABLES.COMMENTS}.id
    LIMIT ${limit};`

    database.query(sql).then(([rows]) => {
        res[constants.RES_DATA] = rows;
        next();
    }).catch((e) => {
        let err = AppError.create(e);
        next(err);
    })
};