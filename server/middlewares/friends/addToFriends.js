let constants = require('../../const');
const {FRIENDS} = constants.TABLES;
let database = require('../../../DB');
let errorMessages = require('../../errors/errorMessages');
let AppError = require('../../errors');

module.exports = function (req, res, next) {
    let {friendId, userId} = req.params;
    let placeholder = [userId, friendId];
    let sql = `INSERT INTO ${FRIENDS} (myId, friendId) VALUES (?, ?); `;

    database.query(sql, placeholder).then(() => {
        next();
    }).catch(e => {
        let err = AppError.create(e);
        next(err);
    })
};