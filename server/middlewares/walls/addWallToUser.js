let constants = require('../../const');
const {USERS_WALLS} = constants.TABLES;
let database = require('../../../DB');
let errorMessages = require('../../errors/errorMessages');
let AppError = require('../../errors');

module.exports = function (req, res, next) {
    let userID = req.getSessionData().payload.id;
    let sql = `INSERT INTO ${USERS_WALLS} (wallId, userId) VALUES (?, ?); `;
    let placeholder = [req.params.wallId, userID];

    database.query(sql, placeholder).then(() => {
        next();
    }).catch(e => {
        let err = AppError.create(e);
        next(err);
    })
};
