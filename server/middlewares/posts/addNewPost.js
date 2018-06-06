let constants = require('../../const');
const TABLES = constants.TABLES;
let database = require('../../../DB');
let errorMessages = require('../../errors/errorMessages');
let AppError = require('../../errors');

module.exports = function addPost (req, res, next) {
    let userID = req.getSessionData().payload.id;
    let {fields, values} = database.prepareModel({
        ...req.body,
        ownerId: userID
    });


    let sql = `INSERT INTO ${TABLES.POSTS} (${fields}) VALUES (${values}); 
SELECT * FROM ${TABLES.POSTS} WHERE id=LAST_INSERT_ID();
`;

    database.query(sql).then(([rows]) => {
        res[constants.RES_DATA] = {...rows[1][0]};
        next();
    }).catch(() => {
        let err = AppError.create(errorMessages.USER_EXIST);
        next(err);
    })
};

