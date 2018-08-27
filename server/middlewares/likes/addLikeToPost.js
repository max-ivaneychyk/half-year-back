let constants = require('../../const');
const {POSTS_LIKES} = constants.TABLES;
let database = require('../../../DB');
let errorMessages = require('../../errors/errorMessages');
let AppError = require('../../errors');

module.exports = function addPost (req, res, next) {
    let sql = `INSERT INTO ${POSTS_LIKES} (likeId, postId) VALUES (?, ?); `;
    let placeholder = [req.params.likeId, req.params.postId];

    database.query(sql, placeholder).then(() => {
        next();
    }).catch(e => {
        let err = AppError.create(e);
        next(err);
    })
};