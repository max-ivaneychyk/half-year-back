let constants = require('../../const/index');
let database = require('../../../DB/index');
let errorMessages = require('../../errors/errorMessages');
let AppError = require('../../errors');
const {TABLES} = constants;

module.exports = function addNewUser (req, res, next) {
    let {fields, values} = database.prepareModel({
        ...req.body
    });
    let sql = `INSERT INTO ${TABLES.USERS} (${fields}) VALUES (${values});`;

    database.query(sql).then(() => {
        res.ans.merge(req.body);
       next();
    }).catch(e => {
        let err = e;
        next(err);
    })
};
