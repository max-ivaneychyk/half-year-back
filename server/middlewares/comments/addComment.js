const {TABLES, ENTITIES} = require('../../const');
let database = require('../../../DB');
let errorMessages = require('../../errors/errorMessages');
let AppError = require('../../errors');

module.exports = function addComment (req, res, next) {
    let userID = req.getSessionData().payload.id;
    let sql = `INSERT INTO ${TABLES.COMMENTS} (text) VALUES (?); `;
    let placeholder = [req.body.text];

    database.query(sql, placeholder).then(([rows]) => {
        req.params.commentId = rows.insertId;
        next();
    }).catch(e => {
        let err = AppError.create(e);
        next(err);
    })
};
