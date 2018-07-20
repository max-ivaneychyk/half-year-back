let database = require('../../../DB/index');
let {LIMIT, TABLES} = require('../../const');
let {USERS, AVATARS, PHOTOS } = TABLES;
let AppError = require('../../errors/index');
let errorMessages = require('../../errors/errorMessages');

module.exports = function (req, res, next) {
    let query = `
    SELECT  ${USERS}.id, ${USERS}.firstName, ${USERS}.lastName, ${PHOTOS}.url AS 'avatarUrl'
    FROM ${USERS}
    LEFT JOIN (SELECT photoId FROM ${AVATARS} WHERE ${AVATARS}.ownerId = ${USERS}.id ORDER BY createdAt DESC LIMIT 1) AS avatar ON avatar.ownerId = ${USERS}.id
    LEFT JOIN ${PHOTOS} ON avatar.photoId = ${PHOTOS}.id
    LIMIT ${LIMIT.USERS}`;

    database.query(query).then(([rows]) => {
        res.ans.merge({data: rows});
        next()
    }).catch(next);
};