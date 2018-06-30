let {TABLES, ENTITIES} = require('../../const');
let database = require('../../../DB');
let errorMessages = require('../../errors/errorMessages');
let AppError = require('../../errors');

module.exports = function (req, res, next) {
    let sql = `SELECT id, ownerId, createdAt, recipientId, entityId
FROM Likes 
WHERE id = ?;`;
    let placeholder = [res.ans.get().id];

    database.query(sql, placeholder).then(([rows]) => {

        next();
    }).catch(e => {
        let err = AppError.create(e);
        next(err);
    });
};