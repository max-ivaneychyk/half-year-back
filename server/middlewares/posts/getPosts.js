const {TABLES, ENTITIES} = require('../../const');
const {POSTS, USERS, LIKES, COMMENTS} = TABLES;
let database = require('../../../DB');
let errorMessages = require('../../errors/errorMessages');
let AppError = require('../../errors');
let utils = require('../utils');

module.exports = function  (req, res, next) {
    let sql = `
    SELECT ${POSTS}.*,
     ${USERS}.firstName, ${USERS}.lastName,
     ${COMMENTS}.text AS '${COMMENTS}.text',
    (SELECT count(${LIKES}.recipientId) FROM ${LIKES} WHERE ${LIKES}.recipientId = ${POSTS}.id) AS countLikes,
    (SELECT ${LIKES}.id FROM ${LIKES} WHERE ${LIKES}.recipientId = ${POSTS}.id AND ${LIKES}.entityId = ${ENTITIES.POST} LIMIT 1) AS likedId
    FROM ${POSTS}  
    LEFT JOIN ${USERS} ON ${POSTS}.ownerId = ${USERS}.id
    LEFT JOIN ${COMMENTS} ON ${POSTS}.id = ${COMMENTS}.recipientId
    LIMIT 10`;

    database.query(sql).then(([rows]) => {
    console.log(utils);
    
    try {
     
       rows = utils.groupJoinData(rows, {

          }, {
            checkExisting: true
          })
    } catch(e) {
console.log(e)
    }
        rows = utils.groupJoinData(rows)

        res.ans.merge({data: rows});
        next();
    }).catch((e) => {
        let err = AppError.create(e);
        next(err);
    })
};
