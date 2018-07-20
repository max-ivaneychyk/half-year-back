let database = require('../../../DB/index');
let {LIMIT, TABLES} = require('../../const');
let {USERS, AVATARS, PHOTOS } = TABLES;
let AppError = require('../../errors/index');
let errorMessages = require('../../errors/errorMessages');

module.exports = function (req, res, next) {
    let userID = req.getSessionData().payload.id;
    let query = `
    SELECT  Users.id, Users.firstName, Users.lastName, 
    (
      SELECT Photos.url 
      FROM Avatars, Photos 
      WHERE ownerId=Users.id AND Avatars.photoId=Photos.id 
      ORDER BY Avatars.createdAt DESC 
      LIMIT 1
    ) AS 'avatarUrl'
    FROM Users
    WHERE Users.id != ${userID} AND Users.id NOT IN (SELECT friendId FROM Friends WHERE myId = ${userID})
    LIMIT 10
`;

    database.query(query).then(([rows]) => {
        res.ans.merge({data: rows});
        next()
    }).catch(next);
};