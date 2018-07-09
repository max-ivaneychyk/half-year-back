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

/*    files.forEach(file => {*/
        let sql = `INSERT INTO ${PHOTOS} (url) VALUES (?); `;
        let placeholder = [files[0].originalname];

    //     sqlList.push(sql);
    //     placeholders.push(placeholder);
    // });


    database.query(sql, placeholder).then((rows) => {
       res.ans.set({data: {
            id: rows[0].insertId
        }});


        next();
    }).catch(e => {
        let err = AppError.create(e);
        next(err);
    });
};