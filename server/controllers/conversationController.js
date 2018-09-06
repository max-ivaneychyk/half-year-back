const entities = require('../entities');
const Validator = require('../validators/Validator');
let {CommentModel} = require('../models/index');
let AppError = require('../errors');
const Controller = require('./Controller');


class ConversationController extends Controller {
    constructor () {
        super();

        this.getConversationByUser = [
            this.checkToken,
            this.addUserIdToParams,
            this._getConversationIdByUser,
            this.sendAnswer
        ];

        this.getListConversations = [
            this.checkToken,
            this.addUserIdToParams,
            this._getConversations,
            this.mapRecors([this.JOIN_OBJECTS.LAST_MESSAGE]),
            this.sendAnswer
        ];

        this.getListMessagesForConversation = [
            this.checkToken,
            this.addUserIdToParams,
            this._getListMessages,
            this.mapRecors([]),
            this.sendAnswer
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