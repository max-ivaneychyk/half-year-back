const {TABLES, ENTITIES} = require('../../const');
const {COMMENTS, USERS, LIKES} = TABLES;
let database = require('../../../DB');
let errorMessages = require('../../errors/errorMessages');
let AppError = require('../../errors');

module.exports = function addComment (req, res, next) {
    let userID = req.getSessionData().payload.id;
    let commentId = res.ans.get().id;
    let sql = `
    SELECT ${COMMENTS}.*,
    (SELECT count(${LIKES}.recipientId) FROM ${LIKES} WHERE ${LIKES}.recipientId = ${COMMENTS}.id) AS 'countLikes',
    ${USERS}.firstName AS 'owner.firstName', ${USERS}.lastName AS 'owner.lastName',  ${USERS}.id AS 'owner.id'
    FROM  ${COMMENTS} 
    LEFT JOIN ${USERS} ON ${COMMENTS}.ownerId = ${USERS}.id
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
