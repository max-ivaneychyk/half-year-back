let database = require('../../DB');
let SQL = require('../../DB/SQL/users');
let errorMessages = require('../const').ERROR_MESSAGES;

module.exports = function (req, res, next) {
    let {fields, values}  = database.prepareModel(req.body);
    let sql = SQL.add(fields, values);

    database.query(sql).then(([rows]) => {
       if (rows.length) {
           return next(errorMessages.USER_EXIST);
       }

       next();
    }).catch(next)
};
