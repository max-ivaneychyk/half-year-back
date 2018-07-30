const middlewares = require('../middlewares');
const database = require('../../DB').connect();

class FriendsController {
    constructor () {
        this.addToFriends = [
            middlewares.token.checkToken,
            middlewares.utils.addUserIdToParams,
            middlewares.friends.addToFriends,
            middlewares.sendAnswer
        ];

        this.getListMyFriends = [
            middlewares.token.checkToken,
            middlewares.utils.addUserIdToParams,
            middlewares.friends.getListFriends,
            middlewares.friends.paginationFriends,
            middlewares.sendAnswer
        ];

        this.getListFriendsForUser = [
            middlewares.token.checkToken,
            middlewares.friends.getListFriends,
            middlewares.sendAnswer
        ];

        this.deleteFromFriends = [
            middlewares.token.checkToken,
            middlewares.utils.addUserIdToParams,
            middlewares.friends.deleteFromFriends,
            middlewares.sendAnswer
        ];

        this.getInvitesToFriends = [
            middlewares.token.checkToken,
            middlewares.utils.addUserIdToParams,
            middlewares.friends.getInvitesToFriends,
            middlewares.sendAnswer
        ];

        this.getMyRequests = [
            middlewares.token.checkToken,
            middlewares.utils.addUserIdToParams,
            middlewares.friends.getMyRequests,
            middlewares.sendAnswer
        ]

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
}

module.exports = new FriendsController;