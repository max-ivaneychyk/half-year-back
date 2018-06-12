let constants = require('../../const');
const TABLES = constants.TABLES;
let database = require('../../../DB');
let errorMessages = require('../../errors/errorMessages');
let AppError = require('../../errors');

module.exports = function deleteComment (req, res, next) {
    let commentId = req.params.commentId;
    let sql = `
    DELETE FROM ${TABLES.COMMENTS} WHERE id=${commentId};
    DELETE FROM ${TABLES.COMMENTS_TO_POSTS} WHERE commentId=${commentId};
    `;

    database.query(sql).then(([rows]) => {
        res[constants.RES_DATA] = {...rows[1][0]};
        next();
    }).catch((e) => {
        let err = AppError.create(e);
        next(err);
    })
};