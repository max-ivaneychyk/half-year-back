let constants = require('../../const');
const {WALLS_POSTS} = constants.TABLES;
let database = require('../../../DB');
let errorMessages = require('../../errors/errorMessages');
let AppError = require('../../errors');

module.exports = function addPost (req, res, next) {
    let sql = `INSERT INTO ${WALLS_POSTS} (wallId, postId) VALUES (?, ?); `;
    let placeholder = [req.params.wallId,  req.params.postId];

    database.query(sql, placeholder).then(() => {
        next();
    }).catch(e => {
        let err = AppError.create(e);
        next(err);
    })
};
