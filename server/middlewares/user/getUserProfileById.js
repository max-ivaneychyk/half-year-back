let database = require('../../../DB/index');
let {USERS, AUTH, USERS_WALLS, WALLS, AVATARS, PHOTOS} = require('../../const/index').TABLES;
let AppError = require('../../errors/index');
let errorMessages = require('../../errors/errorMessages');

module.exports = function (req, res, next) {
    let {userId} = req.params;
    let query = `
    SELECT  ${USERS}.firstName, ${USERS}.lastName, ${USERS}.id, 
    (SELECT url 
        FROM ${PHOTOS} 
        WHERE (
            SELECT photoId 
            FROM ${AVATARS} 
            WHERE ${AVATARS}.ownerId=${USERS}.id ORDER BY createdAt DESC LIMIT 1)=${PHOTOS} .id) 
    AS photoUrl,
    ${WALLS}.id AS 'walls[0].id', ${WALLS}.title AS 'walls[0].title'
    
    FROM ${USERS} 
    LEFT JOIN ${USERS_WALLS} ON ${USERS}.id=${USERS_WALLS}.userId
    LEFT JOIN ${WALLS} ON ${USERS_WALLS}.wallId=${WALLS}.id
    WHERE ${USERS}.id = ?
    `;

    database.query(query, [userId]).then(([rows]) => {
        let data = rows[0];

        if (!data) {
            return next(AppError.create(errorMessages.USER_NOT_FOUNT))
        }

        req.ans.set({data});

        next()
    }).catch(next);
};

