const middlewares = require('../middlewares');
const entities = require('../entities');
let AppError = require('../errors');
const Controller = require('./Controller');

class FriendsController extends Controller {
    constructor () {
        super();

        this.addToFriends = [
            this.checkToken,
            this.addUserIdToParams,
            this._addUserToFriends,
            this.sendAnswer
        ];

        this.getListMyFriends = [
            this.checkToken,
            this.addUserIdToParams,
            this._getListFriends,
            middlewares.friends.paginationFriends,
            this.sendAnswer
        ];
        
        this.getListFriendsForUser = [
            this.checkToken,
            this._getListFriends,
            middlewares.friends.paginationFriends,
            this.sendAnswer
        ];

        this.deleteFromFriends = [
            this.checkToken,
            this.addUserIdToParams,
            this._deleteUserFromFriends,
            this.sendAnswer
        ];

        this.getInvitesToFriends = [
            this.checkToken,
            this.addUserIdToParams,
            this._getInvitesToFriends,
            this.sendAnswer
        ];

        this.getMyRequests = [
            this.checkToken,
            this.addUserIdToParams,
            this._getMyRequestsToFriends,
            this.sendAnswer
        ]

    }

    _addUserToFriends (req, res, next) {
        entities.friends.addToFriends(req.params).then(() => {
            next();
        }).catch(e => next(AppError.create(e)))
    }

    _getInvitesToFriends (req, res, next) {
        entities.friends.getInvitesToFriends(req.params).then(([rows]) => {
            req.ans.set({
                data: rows
            });
            next();
        }).catch(e => next(AppError.create(e)))
    }

    _getMyRequestsToFriends (req, res, next) {
        entities.friends.getMyRequestsToFriends(req.params).then(([rows]) => {
            req.ans.set({
                data: rows
            });
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