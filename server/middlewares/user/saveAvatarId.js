let constants = require('../../const');
const {AVATARS} = constants.TABLES;
let database = require('../../../DB');
let errorMessages = require('../../errors/errorMessages');
let AppError = require('../../errors');

module.exports = function (req, res, next) {
    let userID = req.getSessionData().payload.id;
    let avatarId = req.ans.get().data.id;
    let placeholder = [userID, avatarId];
    let sql = `INSERT INTO ${AVATARS} (ownerId, photoId) VALUES (?, ?); `;

    database.query(sql, placeholder).then(() => {
        next();
    }).catch(e => {
        let err = AppError.create(e);
        next(err);
    })
};