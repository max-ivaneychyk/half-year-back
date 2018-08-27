let {TABLES} = require('../../const');
let database = require('../../../DB');
let errorMessages = require('../../errors/errorMessages');
let AppError = require('../../errors');

module.exports = function deleteComment (req, res, next) {
    let likeId = req.params.likeId;
    let sql = `
    DELETE FROM ${TABLES.LIKES} WHERE id=${likeId};
    `;

    database.query(sql).then(() => {
        next();
    }).catch((e) => {
        let err = AppError.create(e);
        next(err);
    })
};