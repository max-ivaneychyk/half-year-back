const middlewares = require('../middlewares');

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
}

module.exports = new FriendsController;