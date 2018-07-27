let constants = require('../../const');
const {POSTS} = constants.TABLES;
let database = require('../../../DB');
let errorMessages = require('../../errors/errorMessages');
let AppError = require('../../errors');

module.exports = function addPost (req, res, next) {
    let postId = req.params.postId;
    let sql = `DELETE FROM ${POSTS} WHERE id=${postId};`;

    database.query(sql).then(() => {
        res.status(constants.STATUS_CODE.CONTENT_WAS_DELETED);
        req.ans.clear();
        next();
    }).catch((e) => {
        let err = AppError.create(e);
        next(err);
    })
};