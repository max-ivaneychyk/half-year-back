const {TABLES, ENTITIES} = require('../../const');
let database = require('../../../DB');
let errorMessages = require('../../errors/errorMessages');
let AppError = require('../../errors');

module.exports = function addComment (req, res, next) {
    let userID = req.getSessionData().payload.id;
    let sql = `INSERT INTO ${TABLES.COMMENTS} (ownerId, text, recipientId, entityId) VALUES (?, ?, ?, ?); `;
    let placeholder = [userID, req.body.text, req.params.postId, ENTITIES.POST];

    database.query(sql, placeholder).then(([rows]) => {
        res.ans.set({id: rows.insertId});
        next();
    }).catch(e => {
        let err = AppError.create(e);
        next(err);
    })
};
