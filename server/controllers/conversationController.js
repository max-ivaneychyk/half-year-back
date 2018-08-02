const entities = require('../entities');
const middlewares = require('../middlewares');
const Validator = require('../validators/Validator');
let {CommentModel} = require('../models/index');
let {groupJoinData, CHECK_KEYS} = middlewares.utils.joiner;
let AppError = require('../errors');


class ConversationController {
    constructor () {
        this.getConversationByUser = [
            middlewares.token.checkToken,
            middlewares.utils.addUserIdToParams,
            this._getConversationIdByUser,
            middlewares.sendAnswer
        ];

        this.getListConversations = [
            middlewares.token.checkToken,
            middlewares.utils.addUserIdToParams,
            this._getConversations,
            groupJoinData([]),
            middlewares.sendAnswer
        ]
    }

    _getConversationIdByUser (req, res, next) {
        entities.conversation.getConversationByFriendId(req.params).then((rows) => {
            req.ans.set({
                data: rows
            });
            next();
        }).catch(e => next(AppError.create(e)))
    }

    _getConversations (req, res, next) {
        entities.conversation.getListMyConversations(req.params).then(([rows]) => {
            req.ans.set({
                data: rows
            });
            next();
        }).catch(e => next(AppError.create(e)))
    }
}

module.exports = new ConversationController;