let constants = require('../../const');
const {FRIENDS, USERS} = constants.TABLES;
let database = require('../../../DB');
let errorMessages = require('../../errors/errorMessages');
let AppError = require('../../errors');

module.exports = function (req, res, next) {
    let {userId} = req.params;
    let placeholder = [userId, userId];
    let sql = `
       SELECT count(*) as count
    FROM Users 
    INNER JOIN Friends as f ON f.myId=?
    INNER JOIN Friends ON Friends.friendId=? AND Friends.myId = f.friendId
    WHERE Users.id = f.friendId
    `;

    database.query(sql, placeholder).then(([rows]) => {
        req.ans.merge({
            pagination: {
                total: rows[0].count
            }
        });
        next();
    }).catch(e => {
        let err = AppError.create(e);
        next(err);
    })
};