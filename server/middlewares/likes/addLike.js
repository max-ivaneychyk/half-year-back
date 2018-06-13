const {TABLES} = require('../../const');
let database = require('../../../DB');
let errorMessages = require('../../errors/errorMessages');
let AppError = require('../../errors');

module.exports = function (req, res, next) {
    let userID = req.getSessionData().payload.id;
    let {fields, values} = database.prepareModel({
        ownerId: userID
    });

    let sql = `INSERT INTO ${TABLES.LIKES} (${fields}) VALUES (${values}); 
SELECT * FROM ${TABLES.LIKES} WHERE id=LAST_INSERT_ID();
`;

    database.query(sql).then(([rows]) => {
        res.ans.merge(rows[1][0]);
        next();
    }).catch(e => {
        let err = AppError.create(e);
        next(err);
    })
};