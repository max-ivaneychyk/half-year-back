let constants = require('../../const');
const {FRIENDS, USERS} = constants.TABLES;
let database = require('../../../DB');
let errorMessages = require('../../errors/errorMessages');
let AppError = require('../../errors');

module.exports = function (req, res, next) {
    let {userId} = req.params;
    let placeholder = [userId, userId];
    let sql = `
    
    SELECT Users.*,
      (SELECT Photos.url 
      FROM Avatars, Photos 
      WHERE ownerId=Users.id AND Avatars.photoId=Photos.id 
      ORDER BY Avatars.createdAt DESC 
      LIMIT 1
    ) AS 'avatarUrl'
    FROM Users, Friends
    WHERE Users.id = Friends.myId AND Friends.friendId=? AND Friends.myId 
    NOT IN(	SELECT f.myId 
		FROM Friends as ff, Friends as f 
		WHERE f.myId = ff.friendId AND f.friendId = ff.myId AND ff.myId=?)
    LIMIT 10
    `;

    database.query(sql, placeholder).then(([rows]) => {
        req.ans.set({
            data: rows
        });
        next();
    }).catch(e => {
        let err = AppError.create(e);
        next(err);
    })
};