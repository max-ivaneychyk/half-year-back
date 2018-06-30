let constants = require('../../const');
const {TABLES, ENTITIES} = constants;
let database = require('../../../DB');
let errorMessages = require('../../errors/errorMessages');
let AppError = require('../../errors');

module.exports = function  (req, res, next) {
    let sql = `
    SELECT Posts.*, Users.firstName, Users.lastName,
    (select count(Likes.recipientId) from Likes where Likes.recipientId = Posts.id) as countLikes,
    (select Likes.id from Likes where Likes.recipientId = Posts.id AND Likes.entityId = ${ENTITIES.POST} LIMIT 1) as likedId
    FROM ${TABLES.POSTS}  
    left join Users on Posts.ownerId = Users.id
     LIMIT 10`;

    database.query(sql).then(([rows]) => {
        res.ans.merge({list: rows});
        next();
    }).catch((e) => {
        let err = AppError.create(e);
        next(err);
    })
};
