const middlewares = require('../middlewares');
const Validator = require('../validators/Validator');
let {PostModel} = require('../models/index');

class PostController {
    constructor () {
        this.addNewPost = [
            Validator.create(PostModel),
            middlewares.token.checkToken,
            middlewares.posts.addNewPost,
            middlewares.sendAnswer
        ];

        this.editPost = [
            Validator.create(PostModel),
            middlewares.token.checkToken,
            middlewares.sendAnswer
        ];

        this.deletePost = [
            middlewares.token.checkToken,
            middlewares.sendAnswer
        ];
    }
}

module.exports = new PostController;