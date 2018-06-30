let {TABLES, ENTITIES} = require('../../const');
let database = require('../../../DB');
let errorMessages = require('../../errors/errorMessages');
let AppError = require('../../errors');

module.exports = function (req, res, next) {
    let userID = req.getSessionData().payload.id;
    let sql = `INSERT INTO ${TABLES.LIKES} (recipientId, entityId, ownerId) VALUES (?, ?, ?);`;
    let placeholder = [req.params.postId, ENTITIES.POST, userID];

    database.query(sql, placeholder).then(([rows]) => {
        res.ans.set({id: rows.insertId});
        next();
    }).catch(e => {
        let err = AppError.create(e);
        next(err);
    })
};

