let constants = require('../../const');
const {COMMENTS_LIKES} = constants.TABLES;
let database = require('../../../DB');
let errorMessages = require('../../errors/errorMessages');
let AppError = require('../../errors');

module.exports = function addPost (req, res, next) {
    let sql = `INSERT INTO ${COMMENTS_LIKES} (likeId, commentId) VALUES (?, ?); `;
    let placeholder = [req.params.likeId, req.params.commentId];

    database.query(sql, placeholder).then(() => {
        next();
    }).catch(e => {
        let err = AppError.create(e);
        next(err);
    })
};