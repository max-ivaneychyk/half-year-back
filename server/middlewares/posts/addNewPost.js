let constants = require('../../const');
const TABLES = constants.TABLES;
let database = require('../../../DB');
let SQL = require('../../../DB/SQL');
let errorMessages = require('../../errors/errorMessages');
let AppError = require('../../errors');

module.exports = function addPost (req, res, next) {
    let userID = 5;
    let {fields, values} = database.prepareModel({
        ...req.body
    });


    let sql = `INSERT INTO ${TABLES.POSTS} (${fields}) VALUES (${values}); 
SELECT * FROM ${TABLES.POSTS} WHERE id=LAST_INSERT_ID();
INSERT INTO ${TABLES.POST_TO_USERS} (postId, userId) VALUES (LAST_INSERT_ID(), ${userID});
`;

    database.query(sql).then(([rows]) => {
        res[constants.RES_DATA] = {...rows[1][0]};
        next();
    }).catch(() => {
        let err = AppError.create(errorMessages.USER_EXIST);
        next(err);
    })
};

