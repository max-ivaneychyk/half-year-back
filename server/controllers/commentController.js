const middlewares = require('../middlewares');
const Validator = require('../validators/Validator');
const entities = require('../entities');
let {
    CommentModel
} = require('../models/index');
let {
    groupJoinData,
    CHECK_KEYS
} = middlewares.utils.joiner;

class CommentController {
    constructor() {
        this.addNewCommentUnderPost = [
            Validator.create(CommentModel).body,
            middlewares.token.checkToken,
            middlewares.utils.addUserIdToParams,
            this._addComment,
            this._addCommentToPost,
            this._addUserWhoComment,
            this._getCommentById,
            groupJoinData([]),
            middlewares.sendAnswer
        ];

        this.editCommentById = [];

        this.getListCommentsToPost = [
            middlewares.token.checkToken,
            this._getListCommentsToPost,
            groupJoinData([]),
            middlewares.sendAnswer
        ];

        this.getCommentByUserId = [
            middlewares.token.checkToken,
            middlewares.sendAnswer
        ];

        this.deleteComment = [
            middlewares.token.checkToken,
            this._deleteCommentById,
            middlewares.sendAnswer
        ];
    }

    _addComment(req, res, next) {
        entities.comments.createComment(req.body)
            .then(([row]) => {
                req.params.commentId = row.insertId;
                next();
            })
    }

    _addCommentToPost(req, res, next) {
        entities.comments.addCommentToPost(req.params)
            .then(() => next());
    }

    _addUserWhoComment(req, res, next) {
        entities.comments.saveUserWhoAddComment(req.params)
            .then(() => next());
    }

    _getCommentById(req, res, next) {
        entities.comments.getCommentById(req.params)
            .then(([rows]) => {
                req.ans.set({
                    data: rows[0]
                });
                next();
            });
    }

    _deleteCommentById(req, res, next) {
        entities.comments.deleteComment(req.params)
            .then(() => next());
    }

    _getListCommentsToPost (req, res, next) {
        entities.comments.getListCommentsToPost(req.params)
        .then(([rows]) => {
            req.ans.set({
                data: rows
            });
            next();
        });
    }


}

module.exports = new CommentController;