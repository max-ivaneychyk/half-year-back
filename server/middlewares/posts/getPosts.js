const {TABLES, ENTITIES} = require('../../const');
const {POSTS, USERS, LIKES, COMMENTS} = TABLES;
let database = require('../../../DB');
let errorMessages = require('../../errors/errorMessages');
let AppError = require('../../errors');

module.exports = function  (req, res, next) {
    let sql = `
    SELECT ${POSTS}.*, ${USERS}.firstName, ${USERS}.lastName,
    (SELECT count(${LIKES}.recipientId) FROM ${LIKES} WHERE ${LIKES}.recipientId = ${POSTS}.id) AS countLikes,
    (SELECT ${LIKES}.id FROM ${LIKES} WHERE ${LIKES}.recipientId = ${POSTS}.id AND ${LIKES}.entityId = ${ENTITIES.POST} LIMIT 1) AS likedId,
    (SELECT text FROM ${COMMENTS} WHERE ${COMMENTS}.recipientId = ${POSTS}.id AND ${COMMENTS}.entityId = ${ENTITIES.POST} LIMIT 1) AS lastComment
    FROM ${POSTS}  
    LEFT JOIN ${USERS} ON ${POSTS}.ownerId = ${USERS}.id
    LIMIT 10`;

    database.query(sql).then(([rows]) => {
        res.ans.merge({data: rows});
        next();
    }).catch((e) => {
        let err = AppError.create(e);
        next(err);
    })
};
