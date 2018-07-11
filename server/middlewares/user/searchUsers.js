let database = require('../../../DB/index');
let {LIMIT, TABLES} = require('../../const');
let {USERS, AVATARS, PHOTOS } = TABLES;
let AppError = require('../../errors/index');
let errorMessages = require('../../errors/errorMessages');

module.exports = function (req, res, next) {
    let query = `
    SELECT  ${USERS}.*, ${PHOTOS}.url AS 'avatarUrl'
    FROM ${USERS}
    LEFT JOIN ${AVATARS} ON ${AVATARS}.ownerId = ${USERS}.id
    LEFT JOIN ${PHOTOS} ON ${AVATARS}.photoId = ${PHOTOS}.id
    LIMIT ${LIMIT.USERS}`;

    database.query(query).then(([rows]) => {
        console.log(rows);
        res.ans.merge({data: rows});
        next()
    }).catch(next);
};