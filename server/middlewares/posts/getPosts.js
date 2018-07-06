const {
    TABLES,
    ENTITIES
} = require('../../const');
const {
    POSTS,
    USERS,
    LIKES,
    COMMENTS
} = TABLES;
let database = require('../../../DB');
let errorMessages = require('../../errors/errorMessages');
let AppError = require('../../errors');
let utils = require('../../utils/transformSelection');

module.exports = function (req, res, next) {
    let sql = `
    SELECT post.*,
    ${USERS}.firstName, ${USERS}.lastName,
    ${COMMENTS}.id AS 'comments[0].id',  ${COMMENTS}.text AS 'comments[0].text',
    ${COMMENTS}.createdAt AS 'comments[0].createdAt',  ${COMMENTS}.updatedAt AS 'comments[0].updatedAt',
    OwnerComments.id AS 'comments[0].owner.id',  OwnerComments.firstName AS 'comments[0].owner.firstName', OwnerComments.lastName AS 'comments[0].owner.lastName',
    (SELECT count(${LIKES}.recipientId) FROM ${LIKES} WHERE ${LIKES}.recipientId = post.id) AS countLikes,
    (SELECT count(${COMMENTS}.recipientId) FROM ${COMMENTS} WHERE ${COMMENTS}.recipientId = post.id) AS countComments,
    (SELECT ${LIKES}.id FROM ${LIKES} WHERE ${LIKES}.recipientId = post.id AND ${LIKES}.entityId = ${ENTITIES.POST} LIMIT 1) AS likedId
    FROM ( SELECT * FROM ${POSTS} LIMIT ? ) as post  
    LEFT JOIN ${USERS} ON post.ownerId = ${USERS}.id
    LEFT JOIN ${COMMENTS} ON post.id = ${COMMENTS}.recipientId
    LEFT JOIN ${USERS} AS OwnerComments ON OwnerComments.id = ${COMMENTS}.ownerId`;

    let placeholder = [10];

    database.query(sql, placeholder).then(([rows]) => {
        res.ans.merge({ data: rows });
        next();
    }).catch((e) => {
        let err = AppError.create(e);
        next(err);
    })
};