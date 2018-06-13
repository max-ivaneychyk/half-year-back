const {TABLES} = require('../../const');
let database = require('../../../DB');
let errorMessages = require('../../errors/errorMessages');
let AppError = require('../../errors');

module.exports = function addComment (req, res, next) {
    let userID = req.getSessionData().payload.id;
    let {fields, values} = database.prepareModel({
        ownerId: userID,
        ...req.body
    });

    let sql = `INSERT INTO ${TABLES.COMMENTS} (${fields}) VALUES (${values}); 
SELECT * FROM ${TABLES.COMMENTS} WHERE id=LAST_INSERT_ID();
`;

    database.query(sql).then(([rows]) => {
        res.ans.merge(rows[1][0]);
        next();
    }).catch(e => {
        let err = AppError.create(e);
        next(err);
    })
};
