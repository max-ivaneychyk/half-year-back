const middlewares = require('../middlewares');
const Validator = require('../validators/Validator');
let {CommentModel} = require('../models/index');

class CommentController {
    constructor () {
        this.addNewCommentUnderPost = [
            Validator.create(CommentModel),
            middlewares.token.checkToken,
            middlewares.comments.addComment,
            middlewares.comments.savePostId,
            middlewares.sendAnswer
        ];

        this.editCommentById = [
            Validator.create(CommentModel),
            middlewares.token.checkToken,
            middlewares.comments.editComment,
            middlewares.sendAnswer
        ];

        this.deleteComment = [
            middlewares.token.checkToken,
            middlewares.posts.deletePost,
            middlewares.sendAnswer
        ];
    }
}

module.exports = new CommentController;