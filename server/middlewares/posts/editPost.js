let constants = require('../../const');
const TABLES = constants.TABLES;
let database = require('../../../DB');
let errorMessages = require('../../errors/errorMessages');
let AppError = require('../../errors');

module.exports = function addPost (req, res, next) {
    let postId = req.params.id;
    let {fields, values} = database.prepareModel({
        ...req.body
    });


    let sql = `UPDATE ${TABLES.POSTS} SET description = ${values} WHERE id=${postId}; 
SELECT * FROM ${TABLES.POSTS} WHERE id=${postId};`;

    database.query(sql).then(([rows]) => {
        res.ans.merge(rows[1][0]);
        next();
    }).catch((e) => {
        let err = AppError.create(e);
        next(err);
    })
};

