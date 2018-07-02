let constants = require('../../const');
const {POSTS} = constants.TABLES;
let database = require('../../../DB');
let errorMessages = require('../../errors/errorMessages');
let AppError = require('../../errors');

module.exports = function addPost (req, res, next) {
    let userID = req.getSessionData().payload.id;
    let sql = `INSERT INTO ${POSTS} (description, ownerId) VALUES (?, ?); `;
    let placeholder = [req.body.text, userID];

    database.query(sql, placeholder).then((rows, fields) => {
        res.ans.merge({id: rows[0].insertId});
        next();
    }).catch(e => {
        let err = AppError.create(e);
        next(err);
    })
};

