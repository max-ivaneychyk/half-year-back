let database = require('../../DB');
let SQL = require('../../DB/SQL');
let errorMessages = require('../const/errorMessages');

module.exports = function addNewUser (req, res, next) {
    let {fields, values} = database.prepareModel(req.body);
    let sql = SQL.users.addNewUser(fields, values);

    database.query(sql).then(() => {
       next();
    }).catch(() => next(errorMessages.USER_EXIST))
};
