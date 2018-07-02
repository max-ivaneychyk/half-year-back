let constants = require('../../const');
const {TABLES, ENTITIES} = constants;
let database = require('../../../DB');
let errorMessages = require('../../errors/errorMessages');
let AppError = require('../../errors');

module.exports = function  (req, res, next) {
    let sql = `SELECT * ,
        (SELECT count(Likes.recipientId) from Likes where Likes.recipientId = Posts.id) AS countLikes,
    (SELECT Likes.id from Likes where Likes.recipientId = Posts.id AND Likes.entityId = ${ENTITIES.POST} LIMIT 1) AS likedId
    FROM ${TABLES.POSTS} WHERE id = ? 
     LIMIT 1
    `;
    let placeholder = [res.ans.get().id];

    database.query(sql, placeholder).then(([rows]) => {
        res.ans.set({data: rows[0]});
        next();
    }).catch((e) => {
        let err = AppError.create(e);
        next(err);
    })
};