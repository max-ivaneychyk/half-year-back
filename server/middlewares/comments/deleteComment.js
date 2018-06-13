let {TABLES} = require('../../const');
let database = require('../../../DB');
let errorMessages = require('../../errors/errorMessages');
let AppError = require('../../errors');

module.exports = function deleteComment (req, res, next) {
    let commentId = req.params.commentId;
    let sql = `
    DELETE FROM ${TABLES.COMMENTS} WHERE id=${commentId};
    DELETE FROM ${TABLES.COMMENTS_TO_ENTITIES} WHERE commentId=${commentId};
    `;

    database.query(sql).then(([rows]) => {
        res.ans.merge(rows[1][0]);
        next();
    }).catch((e) => {
        let err = AppError.create(e);
        next(err);
    })
};