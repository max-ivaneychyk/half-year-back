let constants = require('../../const');
const {POSTS} = constants.TABLES;
let database = require('../../../DB');
let errorMessages = require('../../errors/errorMessages');
let AppError = require('../../errors');

module.exports = function addPost (req, res, next) {
    let sql = `INSERT INTO ${POSTS} (description) VALUES (?); `;
    let placeholder = [req.body.text];

    database.query(sql, placeholder).then((rows) => {
        req.params.postId = rows[0].insertId;
        next();
    }).catch(e => {
        let err = AppError.create(e);
        next(err);
    })
};

