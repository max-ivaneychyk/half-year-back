let constants = require('../../const');
const {POSTS} = constants.TABLES;
let database = require('../../../DB');
let errorMessages = require('../../errors/errorMessages');
let AppError = require('../../errors');

module.exports = function addPost (req, res, next) {
    let postId = req.params.postId;
    let {fields, values} = database.prepareModel({
        ...req.body
    });


    let sql = `UPDATE ${POSTS} SET description = ${values} WHERE id=${postId}; 
SELECT * FROM ${POSTS} WHERE id=${postId};`;

    database.query(sql).then(([rows]) => {
        res.ans.merge({data: rows[1][0]});
        next();
    }).catch((e) => {
        let err = AppError.create(e);
        next(err);
    })
};

