const {
    TABLES,
    ENTITIES,
    LIMIT
} = require('../../const');
const {
    POSTS,
    POSTS_PHOTOS,
    PHOTOS,
    USERS,
    POSTS_COMMENTS,
    WALLS_POSTS,
    COMMENTS_LIKES,
    USERS_POSTS,
    USERS_COMMENTS,
    POSTS_LIKES,
    AVATARS,
    LIKES,
    COMMENTS
} = TABLES;
let database = require('../../../DB');
let errorMessages = require('../../errors/errorMessages');
let AppError = require('../../errors');
let utils = require('../../utils/transformSelection');

module.exports = function (req, res, next) {
    let sql = `
    SELECT 
    post.id, post.description, post.updatedAt, post.createdAt,
    ${PHOTOS}.id AS 'photos[0].id', ${PHOTOS}.url AS 'photos[0].url',
    ${USERS}.id AS 'owner.id', ${USERS}.firstName AS 'owner.firstName', ${USERS}.lastName AS 'owner.lastName',
    (SELECT count(*) FROM ${POSTS_LIKES} WHERE ${POSTS_LIKES}.postId = post.id) AS countLikes,
    (SELECT likeId FROM ${POSTS_LIKES} WHERE ${POSTS_LIKES}.postId = post.id LIMIT 1) AS likeId,
    (SELECT count(*) FROM ${POSTS_COMMENTS} WHERE ${POSTS_COMMENTS}.postId = post.id) AS countComments,
    
    (SELECT count(*) FROM ${COMMENTS_LIKES} WHERE ${COMMENTS_LIKES}.commentId = comments.id) AS 'comments[0].countLikes',
    comments.id AS 'comments[0].id', 
    comments.text AS 'comments[0].text', 
    comments.createdAt AS 'comments[0].createdAt',
    
    OwnerComment.id AS  'comments[0].owner.id',
    OwnerComment.firstName AS  'comments[0].owner.firstName',
    OwnerComment.lastName AS  'comments[0].owner.lastName'
    
    FROM ( SELECT * FROM ${POSTS} ORDER BY createdAt DESC LIMIT ?) as post  

    LEFT JOIN ${POSTS_PHOTOS} ON post.id = ${POSTS_PHOTOS}.postId
    LEFT JOIN ${PHOTOS} ON ${POSTS_PHOTOS}.photoId = ${PHOTOS}.id

    LEFT JOIN ${USERS_POSTS} ON ${USERS_POSTS}.postId = post.id
    LEFT JOIN ${USERS} ON ${USERS_POSTS}.userId = ${USERS}.id
    
    LEFT JOIN ${POSTS_COMMENTS} ON ${POSTS_COMMENTS}.postId = post.id
    LEFT JOIN (SELECT ${COMMENTS}.* FROM ${COMMENTS}, ${POSTS_COMMENTS} WHERE ${COMMENTS}.id=${POSTS_COMMENTS}.commentId  ORDER BY createdAt DESC LIMIT 1) AS comments ON comments.id=${POSTS_COMMENTS}.commentId 
    
    LEFT JOIN ${USERS_COMMENTS} ON ${USERS_COMMENTS}.commentId = comments.id
    LEFT JOIN ${USERS} AS OwnerComment ON OwnerComment.id = ${USERS_COMMENTS}.userId

    ORDER BY post.createdAt DESC
    `;

    let placeholder = [LIMIT.POSTS];

    database.query(sql, placeholder).then(([rows], fields) => {
        res.ans.set({
            data: rows
        });
        next();
    }).catch((e) => {
        let err = AppError.create(e);
        next(err);
    })
};