const middlewares = require('../middlewares');
const Validator = require('../validators/Validator');
let {CommentModel} = require('../models/index');

class PostsCommentController {
    constructor () {
        this.addNewComment = [
            Validator.create(CommentModel),
            middlewares.token.checkToken,
            middlewares.comments.addComment,
            middlewares.sendAnswer
        ];

        this.editCommentById = [
            Validator.create(CommentModel),
        //    middlewares.token.checkToken,
            middlewares.posts.editPost,
            middlewares.sendAnswer
        ];

        this.deleteComment = [
      //      middlewares.token.checkToken,
            middlewares.posts.deletePost,
            middlewares.sendAnswer
        ];
    }
}

module.exports = new PostsCommentController;