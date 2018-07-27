const middlewares = require('../middlewares');
const Validator = require('../validators/Validator');
let {PostModel} = require('../models/index');
let {groupJoinData, CHECK_KEYS} = middlewares.utils.joiner;

class PostController {
    constructor () {
        this._getPostById = [
            middlewares.posts.getPost,
            groupJoinData([CHECK_KEYS.PHOTOS, CHECK_KEYS.COMMENTS]),
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
            groupJoinData([CHECK_KEYS.PHOTOS, CHECK_KEYS.COMMENTS]),
            middlewares.posts.addPaginationToPosts,
            middlewares.sendAnswer
        ]
    }
}

module.exports = new PostController;