let {TABLES} = require('../../const');
let database = require('../../../DB');
let errorMessages = require('../../errors/errorMessages');
let AppError = require('../../errors');

module.exports = function editComment (req, res, next) {
    let commentId = req.params.commentId;
    let {values} = database.prepareModel({
        ...req.body
    });


    let sql = `UPDATE ${TABLES.COMMENTS} SET text = ${values} WHERE id=${commentId}; 
SELECT * FROM ${TABLES.COMMENTS} WHERE id=${commentId};`;

    database.query(sql).then(([rows]) => {
        res.ans.merge(rows[1][0]);
        next();
    }).catch((e) => {
        let err = AppError.create(e);
        next(err);
    })
};
