const middlewares = require('../middlewares');
const Validator = require('../validators/Validator');
const entities = require('../entities');
let { CommentModel } = require('../models/index');
const Controller = require('./Controller');

class CommentController extends Controller {
    constructor() {
        super();

        this.addNewCommentUnderPost = [
            Validator.create(CommentModel).body,
            this.checkToken,
            this.addUserIdToParams,
            this._addComment,
            this._addCommentToPost,
            this._addUserWhoComment,
            this._getCommentById,
            this.mapRecords([]),
            this.sendAnswer
        ];

        this.getListCommentsToPost = [
            this.checkToken,
            middlewares.utils.checkPagination,
            this.addUserIdToParams,
            this._getListCommentsToPost,
            this.mapRecords([]),
            this._addPaginationForCommentsToPost,
            this.sendAnswer
        ];

        this.getCommentByUserId = [
            middlewares.token.checkToken,
            middlewares.sendAnswer
        ];

        this.deleteComment = [
            this.checkToken,
            this._deleteCommentById,
            this.sendAnswer
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
        entities.comments.getListCommentsToPost(req.params, req.query)
        .then(([rows]) => {
            req.ans.set({
                data: rows
            });
            next();
        });
    }

    _addPaginationForCommentsToPost (req, res, next) {
        let limit = req.query.limit;
        let offset = req.query.offset;
        let page = offset / limit;

        entities.comments.getTotalCountCommentsToPost(req.params).then(([rows]) => {
            let total = rows[0].total;

            req.ans.merge({
                pagination: {
                    nextOffset: (page + 1) * limit,
                    nextPage: page + 1,
                    total
                }
            });

            next();
        }).catch(next);
    }


}

module.exports = new CommentController;