let constants = require('../../const');
const TABLES = constants.TABLES;
let database = require('../../../DB');
let errorMessages = require('../../errors/errorMessages');
let AppError = require('../../errors');

module.exports = function addPost (req, res, next) {
    let postId = req.params.id;
    let sql = `DELETE FROM ${TABLES.POSTS} WHERE id=${postId};`;

    database.query(sql).then(() => {
        res.status(constants.STATUS_CODE.CONTENT_WAS_DELETED);
        res.ans.clear();
        next();
    }).catch((e) => {
        let err = AppError.create(e);
        next(err);
    })
};