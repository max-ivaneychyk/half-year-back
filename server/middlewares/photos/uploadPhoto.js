let utils = require('../../utils/transformSelection');

let constants = require('../../const');
const {PHOTOS} = constants.TABLES;
let database = require('../../../DB');
let errorMessages = require('../../errors/errorMessages');
let AppError = require('../../errors');

module.exports = function (req, res, next) {
    let files = req.files;
    let placeholders = [];
    let sqlList = [];

    files.forEach(file => {
        let sql = `INSERT INTO ${PHOTOS} (url) VALUES (?); `;
        let placeholder = [file.originalname];

        sqlList.push(sql);
        placeholders.push(placeholder);
    });

    database.listQueries(sqlList, placeholders).then((rows, fields) => {
        req.ans.set({photos: rows.map(row => row.insertId)});
        next();
    }).catch(e => {
        let err = AppError.create(e);
        next(err);
    });

    next();
};