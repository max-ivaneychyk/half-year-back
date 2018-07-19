let constants = require('../../const');
const TABLES = constants.TABLES;
let database = require('../../../DB');
let errorMessages = require('../../errors/errorMessages');
let AppError = require('../../errors');

module.exports = function (req, res, next) {
    let sql = `INSERT INTO ${TABLES.POSTS_COMMENTS} (postId, commentId) VALUES (?, ?);`;
    let placeholder = [req.params.postId, req.params.commentId];

    database.query(sql, placeholder).then(() => {
        next();
    }).catch(e => {
        let err = AppError.create(e);
        next(err);
    })
};