let utils = require('../../utils/transformSelection');

let constants = require('../../const');
const {PHOTOS} = constants.TABLES;
let database = require('../../../DB');
let errorMessages = require('../../errors/errorMessages');
let AppError = require('../../errors');

module.exports = function uploadOnePhoto (req, res, next) {
    let files = req.files;
    let file = files[0];
    let sql = `INSERT INTO ${PHOTOS} (url) VALUES (?); `;
    let path = file.path.replace(global.NODE_PATH, '');
    let placeholder = [path];

    database.query(sql, placeholder).then((rows) => {
        req.ans.set({
            data: {
                id: rows[0].insertId,
                url: path
            }
        });

        next();
    }).catch(e => {
        let err = AppError.create(e);
        next(err);
    });
};