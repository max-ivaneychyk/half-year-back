const database = require('../../DB').connect();
const {IS_OFFLINE, IS_ONLINE} = require('../const');

// TODO: Pagination

class Friends {
    _checkPagination (pagination) {
        if (!pagination) {
            pagination = {};
        }

        if (!pagination.limit || pagination.limit > 10) {
            pagination.limit = 10;
        }

        pagination.offset = pagination.offset || 0;

        return pagination;

    }
    getInvitesToFriends (params, pagination) {
        let {userId} = params;
        let placeholder = [userId, userId];
        let sql = `
            SELECT Users.id, Users.firstName, Users.lastName,
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

        return database.query(sql, placeholder);
    }

    getMyRequestsToFriends (params, pagination) {
        let {userId} = params;
        let placeholder = [userId, userId];
        let sql = `
           SELECT Users.id, Users.firstName, Users.lastName,
           (SELECT Photos.url 
              FROM Avatars, Photos 
              WHERE ownerId=Users.id AND Avatars.photoId=Photos.id 
              ORDER BY Avatars.createdAt DESC 
              LIMIT 1
            ) AS 'avatarUrl'
            FROM Users, Friends
            WHERE Users.id = Friends.friendId AND Friends.myId=? AND Friends.friendId 
            NOT IN(	SELECT f.friendId 
                FROM Friends as ff, Friends as f 
                WHERE f.myId = ff.friendId AND f.friendId = ff.myId AND ff.friendId=?)
            LIMIT 10
            `;

        return database.query(sql, placeholder);
    }

    addToFriends (params) {
        let {friendId, userId} = params;
        let placeholder = [userId, friendId];
        let sql = `INSERT INTO Friends (myId, friendId) VALUES (?, ?); `;

        return database.query(sql, placeholder);
    }

    getListFriends (params = {}, pagination = {}) {
        let {userId, isOnline} = params;
        let {limit, offset} = {limit: 100, offset: 0};
        let placeholder = [userId, userId];
        let sqlOnline = '';

        if (pagination.limit) {
            limit = pagination.limit;
        }

        if (pagination.offset) {
            offset = pagination.offset;
        }

        if (typeof isOnline === 'number') {
            placeholder.push(isOnline);
            sqlOnline = ' AND Online.isOnline = ?'
        }

        let sql = `
        SELECT 
            Users.id, Users.firstName, Users.lastName,
            Online.isOnline,
            (
            SELECT Photos.url 
            FROM Avatars, Photos 
            WHERE ownerId=Users.id AND Avatars.photoId=Photos.id 
            ORDER BY Avatars.createdAt DESC 
            LIMIT 1
            ) AS 'avatarUrl'
        FROM Users 
        INNER JOIN Friends as f ON f.myId=?
        INNER JOIN Friends ON Friends.friendId=? AND Friends.myId = f.friendId
        INNER JOIN Online ON Online.userId = f.friendId ${sqlOnline}
        WHERE Users.id = f.friendId
        LIMIT ?, ? `;

        return database.query(sql, [...placeholder, offset, limit]);
    }

    getListOnlineFriends (params, pagination) {
        params.isOnline = IS_ONLINE;
        return this.getListFriends(params, pagination);
    }

    getListOfflineFriends (params, pagination) {
        params.isOnline = IS_OFFLINE;
        return this.getListFriends(params, pagination);
    }

    deleteFriend (params) {
        let {friendId, userId} = params;
        let placeholder = [userId, friendId];
        let sql = `DELETE FROM Friends WHERE myId=? AND friendId=?;`;

        return database.query(sql, placeholder);
    }
}



module.exports = new Friends;
