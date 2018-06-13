let {TABLES} = require('../../const');
let database = require('../../../DB');
let errorMessages = require('../../errors/errorMessages');
let AppError = require('../../errors');

module.exports = function savePostId (req, res, next) {
    let id = res.ans.get().id;
    let {fields, values} = database.prepareModel({
        likeId: id,
        postId: req.params.postId
    });

    let sql = `INSERT INTO ${TABLES.LIKES_TO_ENTITIES} (${fields}) VALUES (${values});`;

    database.query(sql).then(() => {
        next();
    }).catch(e => {
        let err = AppError.create(e);
        next(err);
    })
};