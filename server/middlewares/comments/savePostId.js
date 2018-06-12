let constants = require('../../const');
const TABLES = constants.TABLES;
let database = require('../../../DB');
let errorMessages = require('../../errors/errorMessages');
let AppError = require('../../errors');

module.exports = function savePostId (req, res, next) {
    let id = res[constants.RES_DATA].id;
    let {fields, values} = database.prepareModel({
        commentId: id,
        postId: req.params.id
    });

    let sql = `INSERT INTO ${TABLES.COMMENTS_TO_POSTS} (${fields}) VALUES (${values});`;

    database.query(sql).then(() => {
        next();
    }).catch(e => {
        let err = AppError.create(e);
        next(err);
    })
};