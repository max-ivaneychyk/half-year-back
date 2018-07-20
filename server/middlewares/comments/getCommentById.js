const {TABLES, ENTITIES} = require('../../const');
const {COMMENTS, USERS, PHOTOS, COMMENTS_LIKES, USERS_COMMENTS, AVATARS} = TABLES;
let database = require('../../../DB');
let errorMessages = require('../../errors/errorMessages');
let AppError = require('../../errors');

module.exports = function addComment (req, res, next) {
    let commentId = req.params.commentId;
    let sql = `
    SELECT ${COMMENTS}.*,
    (SELECT count(*) FROM ${COMMENTS_LIKES} WHERE ${COMMENTS_LIKES}.commentId = ${COMMENTS}.id) AS 'countLikes',
    ${USERS}.firstName AS 'owner.firstName', ${USERS}.lastName AS 'owner.lastName',  ${USERS}.id AS 'owner.id',
    
    (SELECT ${PHOTOS}.url 
        FROM ${PHOTOS}, ${AVATARS} 
        WHERE ${USERS}.id=${AVATARS}.ownerId AND ${PHOTOS}.id=${AVATARS}.photoId
        ORDER BY ${AVATARS}.createdAt DESC 
        LIMIT 1
    ) AS 'owner.avatarUrl'
    
    FROM  ${COMMENTS} 
    
    LEFT JOIN ${USERS_COMMENTS} ON ${COMMENTS}.id = ${USERS_COMMENTS}.commentId
    LEFT JOIN ${USERS} ON ${USERS_COMMENTS}.userId = ${USERS}.id
    WHERE ${COMMENTS}.id = ?; `;
    let placeholder = [commentId];

    database.query(sql, placeholder).then(([rows]) => {
        res.ans.set({data: rows[0]});
        next();
    }).catch(e => {
        let err = AppError.create(e);
        next(err);
    })
};
