let {TABLES} = require('../../const');
let database = require('../../../DB');
let errorMessages = require('../../errors/errorMessages');
let AppError = require('../../errors');

module.exports = function deleteComment (req, res, next) {
    let likeId = req.params.likeId;
    let sql = `
    DELETE FROM ${TABLES.LIKES} WHERE id=${likeId};
    DELETE FROM ${TABLES.LIKES_TO_POSTS} WHERE likeId=${likeId};
    `;

    database.query(sql).then(([rows]) => {
        res.ans.merge(rows[1][0]);
        next();
    }).catch((e) => {
        let err = AppError.create(e);
        next(err);
    })
};