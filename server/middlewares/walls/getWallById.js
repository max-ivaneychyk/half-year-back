let constants = require('../../const');
const {WALLS} = constants.TABLES;
let database = require('../../../DB');
let errorMessages = require('../../errors/errorMessages');
let AppError = require('../../errors');

module.exports = function (req, res, next) {
    let sql = `SELECT title, id FROM ${WALLS} WHERE id=?; `;
    let placeholder = [req.params.wallId];

    database.query(sql, placeholder).then(([rows]) => {
        res.ans.set({data: rows[0]});
        next();
    }).catch(e => {
        let err = AppError.create(e);
        next(err);
    })
};
