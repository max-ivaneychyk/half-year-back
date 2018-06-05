let constants = require('../const');
let database = require('../../DB');
let SQL = require('../../DB/SQL');
let errorMessages = require('../errors/errorMessages');
let AppError = require('../errors');

module.exports = function addNewUser (req, res, next) {
    let {fields, values} = database.prepareModel({
        ...req.body,
        token: res[constants.RES_DATA].session.accessToken
    });
    let sql = SQL.users.registerNewUser(fields, values);

    database.query(sql).then(() => {
       res[constants.RES_DATA] = {...res[constants.RES_DATA], ...req.body};
       next();
    }).catch(() => {
        let err = AppError.create(errorMessages.USER_EXIST);
        next(err);
    })
};
