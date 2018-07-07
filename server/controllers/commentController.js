const middlewares = require('../middlewares');
const Validator = require('../validators/Validator');
let {CommentModel} = require('../models/index');

class CommentController {
    constructor () {
        this.addNewCommentUnderPost = [
            Validator.create(CommentModel),
            middlewares.token.checkToken,
            middlewares.comments.addComment,
            middlewares.comments.getCommentById,
            middlewares.utils.groupJoinData,
            middlewares.sendAnswer
        ];

        this.editCommentById = [
            Validator.create(CommentModel),
            middlewares.token.checkToken,
            middlewares.comments.editComment,
            middlewares.sendAnswer
        ];

        this.getCommentByPostId = [
            middlewares.token.checkToken,
            middlewares.comments.getListCommentsByPostId,
            middlewares.sendAnswer
        ];

        this.getCommentByUserId = [
            middlewares.token.checkToken,
            middlewares.comments.getListCommentsByUserId,
            middlewares.sendAnswer
        ];

        this.deleteComment = [
            middlewares.token.checkToken,
            middlewares.comments.deleteComment,
            middlewares.sendAnswer
        ];
    }
}

module.exports = new CommentController;