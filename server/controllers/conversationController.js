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
            groupJoinData([CHECK_KEYS.LAST_MESSAGE]),
            middlewares.sendAnswer
        ];

        this.getListMessagesForConversation = [
            middlewares.token.checkToken,
            middlewares.utils.addUserIdToParams,
            this._getListMessages,
            groupJoinData([]),
            middlewares.sendAnswer
        ];
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

    _getListMessages (req, res, next) {
        let {messageId} = req.query;
        let {conversationId, userId} = req.params;
        entities.message.getListMessagesForConversation({messageId, conversationId, userId}).then(([rows]) => {
            req.ans.set({
                data: rows
            });
            next();
        }).catch(e => next(AppError.create(e)))
    }

}

module.exports = new ConversationController;