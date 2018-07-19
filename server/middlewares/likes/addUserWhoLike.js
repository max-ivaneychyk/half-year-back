let constants = require('../../const');
const {USERS_LIKES} = constants.TABLES;
let database = require('../../../DB');
let errorMessages = require('../../errors/errorMessages');
let AppError = require('../../errors');

module.exports = function addPost (req, res, next) {
    let userID = req.getSessionData().payload.id;
    let sql = `INSERT INTO ${USERS_LIKES} (likeId, userId) VALUES (?, ?); `;
    let placeholder = [req.params.likeId, userID];

    database.query(sql, placeholder).then(() => {
        next();
    }).catch(e => {
        let err = AppError.create(e);
        next(err);
    })
};