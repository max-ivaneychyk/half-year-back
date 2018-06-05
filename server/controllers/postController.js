const middlewares = require('../middlewares');
const Validator = require('../validators/Validator');
let {PostModel} = require('../models/index');

class PostController {
    constructor () {
        this.addNewPost = [
            Validator.create(PostModel),
            middlewares.posts.addNewPost,
            middlewares.sendAnswer
        ];

        this.editPost = [
            Validator.create(PostModel),
            middlewares.sendAnswer
        ];

        this.deletePost = [
            middlewares.sendAnswer
        ];
    }
}

module.exports = new PostController;