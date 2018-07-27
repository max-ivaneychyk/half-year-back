let {TABLES, ENTITIES} = require('../../const');
let database = require('../../../DB');
let errorMessages = require('../../errors/errorMessages');
let AppError = require('../../errors');

module.exports = function (req, res, next) {
    let sql = `SELECT id, createdAt FROM Likes WHERE id = ?;`;
    let placeholder = [req.params.likeId];

    database.query(sql, placeholder).then(([rows]) => {
        req.ans.set({data: rows[0]});
        next();
    }).catch(e => {
        let err = AppError.create(e);
        next(err);
    });
};