let constants = require('../../const');
const {WALLS} = constants.TABLES;
let database = require('../../../DB');
let errorMessages = require('../../errors/errorMessages');
let AppError = require('../../errors');

module.exports = function addPost (req, res, next) {
    let sql = `INSERT INTO ${WALLS} (title) VALUES (?); `;
    let placeholder = ['title'];

    database.query(sql, placeholder).then((rows) => {
        req.params.wallId = rows[0].insertId;
        next();
    }).catch(e => {
        let err = AppError.create(e);
        next(err);
    })
};
