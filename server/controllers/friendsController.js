const middlewares = require('../middlewares');
const entities = require('../entities');
let AppError = require('../errors');

class FriendsController {
    constructor () {
        this.addToFriends = [
            middlewares.token.checkToken,
            middlewares.utils.addUserIdToParams,
            this._addUserToFriends,
            middlewares.sendAnswer
        ];

        this.getListMyFriends = [
            middlewares.token.checkToken,
            middlewares.utils.addUserIdToParams,
            this._getListFriends,
            middlewares.friends.paginationFriends,
            middlewares.sendAnswer
        ];

        this.getListFriendsForUser = [
            middlewares.token.checkToken,
            this._getListFriends,
            middlewares.sendAnswer
        ];

        this.deleteFromFriends = [
            middlewares.token.checkToken,
            middlewares.utils.addUserIdToParams,
            this._deleteUserFromFriends,
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

    _addUserToFriends (req, res, next) {
        entities.friends.addToFriends(req.params).then(() => {
            next();
        }).catch(e => next(AppError.create(e)))
    }

    _getListFriends (req, res, next) {

        entities.friends.getListFriends(req.params).then(([rows]) => {
            req.ans.set({
                data: rows
            });

            next();
        }).catch(e => next(AppError.create(e)))
    }

    _deleteUserFromFriends (req, res, next) {

        entities.friends.deleteFriend(req.params).then(() => {
            next();
        }).catch(e => next(AppError.create(e)))
    }
}

module.exports = new FriendsController;