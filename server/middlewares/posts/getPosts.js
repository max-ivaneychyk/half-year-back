const {
    TABLES,
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
    USERS_LIKES,
    USERS_COMMENTS,
    POSTS_LIKES,
    AVATARS,
    COMMENTS
} = TABLES;
let database = require('../../../DB');
let errorMessages = require('../../errors/errorMessages');
let AppError = require('../../errors');

module.exports = function (req, res, next) {
    let userID = req.getSessionData().payload.id;
    let {wallId} = req.params;
    let limit = req.query.limit || LIMIT.POSTS;
    let offset = req.query.offset || 0;

    let sql = `
    SELECT 
    post.id, post.description, post.updatedAt, post.createdAt,
    ${PHOTOS}.id AS 'photos[0].id', ${PHOTOS}.url AS 'photos[0].url',
    ${USERS}.id AS 'owner.id', ${USERS}.firstName AS 'owner.firstName', ${USERS}.lastName AS 'owner.lastName',
    (SELECT count(*) FROM ${POSTS_LIKES} WHERE ${POSTS_LIKES}.postId = post.id) AS countLikes,
    (SELECT count(*) FROM ${POSTS_COMMENTS} WHERE ${POSTS_COMMENTS}.postId = post.id) AS countComments,
    (SELECT ${USERS_LIKES}.likeId FROM ${USERS_LIKES}, ${POSTS_LIKES} WHERE  ${USERS_LIKES}.userId = ${userID} AND ${USERS_LIKES}.likeId = ${POSTS_LIKES}.likeId AND ${POSTS_LIKES}.postId = post.id LIMIT 1) AS likeId,
    
    (SELECT count(*) FROM ${COMMENTS_LIKES} WHERE ${COMMENTS_LIKES}.commentId = ${COMMENTS}.id) AS 'comments[0].countLikes',
    ${COMMENTS}.id AS 'comments[0].id', 
    ${COMMENTS}.text AS 'comments[0].text', 
    ${COMMENTS}.createdAt AS 'comments[0].createdAt',
    (SELECT ${USERS_LIKES}.likeId FROM ${USERS_LIKES}, ${COMMENTS_LIKES} WHERE  ${USERS_LIKES}.userId = ${userID} AND ${USERS_LIKES}.likeId = ${COMMENTS_LIKES}.likeId AND ${COMMENTS_LIKES}.commentId =  ${COMMENTS}.id LIMIT 1) AS  'comments[0].likeId',
    
    OwnerComment.id AS  'comments[0].owner.id',
    OwnerComment.firstName AS  'comments[0].owner.firstName',
    OwnerComment.lastName AS  'comments[0].owner.lastName',
    
    (SELECT ${PHOTOS}.url 
        FROM ${PHOTOS}, ${AVATARS} 
        WHERE ${USERS}.id=${AVATARS}.ownerId AND ${PHOTOS}.id=${AVATARS}.photoId
        ORDER BY ${AVATARS}.createdAt DESC 
        LIMIT 1
    ) AS 'owner.avatarUrl',

    (SELECT ${PHOTOS}.url 
        FROM ${PHOTOS}, ${AVATARS} 
        WHERE OwnerComment.id=${AVATARS}.ownerId AND ${PHOTOS}.id=${AVATARS}.photoId
        ORDER BY ${AVATARS}.createdAt DESC 
        LIMIT 1
    ) AS 'comments[0].owner.avatarUrl'
    
    FROM ( 
        SELECT ${POSTS}.* 
        FROM ${POSTS}, ${WALLS_POSTS} 
        WHERE ${WALLS_POSTS}.wallId=${wallId} AND ${WALLS_POSTS}.postId=${POSTS}.id
        ORDER BY ${POSTS}.createdAt DESC 
        LIMIT ?, ?
    ) as post  

    LEFT JOIN ${POSTS_PHOTOS} ON post.id = ${POSTS_PHOTOS}.postId
    LEFT JOIN ${PHOTOS} ON ${POSTS_PHOTOS}.photoId = ${PHOTOS}.id

    LEFT JOIN ${USERS_POSTS} ON ${USERS_POSTS}.postId = post.id
    LEFT JOIN ${USERS} ON ${USERS_POSTS}.userId = ${USERS}.id
    
    LEFT JOIN ${COMMENTS} ON ${COMMENTS}.id = (SELECT ${COMMENTS}.id 
        FROM ${POSTS_COMMENTS}, ${COMMENTS} 
        WHERE ${POSTS_COMMENTS}.postId=post.id 
        AND ${POSTS_COMMENTS}.commentId=${COMMENTS}.id
        ORDER BY ${COMMENTS}.createdAt DESC
        LIMIT 1
    )
    
    LEFT JOIN ${USERS_COMMENTS} ON ${USERS_COMMENTS}.commentId = ${COMMENTS}.id
    LEFT JOIN ${USERS} AS OwnerComment ON OwnerComment.id = ${USERS_COMMENTS}.userId

    ORDER BY post.createdAt DESC
    `;

    let placeholder = [+offset, +limit];

    database.query(sql, placeholder).then(([rows]) => {
        res.ans.set({
            data: rows
        });
        next();
    }).catch((e) => {
        let err = AppError.create(e);
        next(err);
    })
};