const middlewares = require('../middlewares');
const Validator = require('../validators/Validator');
let {PostModel} = require('../models/index');

class PostController {
    constructor () {
        this._getPostById = [
            middlewares.posts.getPost,
            middlewares.utils.groupJoinData,
        ];

        this.addNewPost = [
            Validator.create(PostModel),
            middlewares.token.checkToken,
            middlewares.posts.addNewPost,
            middlewares.posts.addUserToPost,
            middlewares.posts.addPostToWall,
            middlewares.posts.addPhotosToPost,
            ...this._getPostById,
            middlewares.sendAnswer
        ];

        this.editPostById = [];

        this.getPostById = [
            middlewares.token.checkToken,
            ...this._getPostById,
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
            middlewares.posts.addPaginationToPosts,
            middlewares.sendAnswer
        ]
    }
}

module.exports = new PostController;