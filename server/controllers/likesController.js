const middlewares = require('../middlewares');

class LikesController {
    constructor () {
        // For Posts
        this.setLikeToPost = [
            middlewares.token.checkToken,
            middlewares.likes.addLike,
            middlewares.likes.addLikeToPost,
            middlewares.sendAnswer
        ];

        this.deleteLikeToPost = [
            middlewares.token.checkToken,
            middlewares.likes.removeLike,
            middlewares.sendAnswer
        ];
    }
}

module.exports = new LikesController;