const middlewares = require('../middlewares');
const Validator = require('../validators/Validator');
let {PostModel} = require('../models/index');

class PostController {
    constructor () {
        this.addNewPost = [
            Validator.create(PostModel),
            middlewares.token.checkToken,
            middlewares.posts.addNewPost,
            middlewares.posts.getPost,
            middlewares.sendAnswer
        ];

        this.editPostById = [
            Validator.create(PostModel),
            middlewares.token.checkToken,
            middlewares.posts.editPost,
            middlewares.sendAnswer
        ];

        this.deletePost = [
            middlewares.token.checkToken,
            middlewares.posts.deletePost,
            middlewares.sendAnswer
        ];

        this.getList = [
            middlewares.token.checkToken,
            middlewares.posts.getPosts,
            middlewares.utils.groupJoinData,
            middlewares.sendAnswer
        ]
    }
}

module.exports = new PostController;