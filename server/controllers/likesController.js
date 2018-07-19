const middlewares = require('../middlewares');

class LikesController {
    constructor () {
        // For Posts
        this.setLikeToPost = [
            middlewares.token.checkToken,
            middlewares.likes.createLike,
            middlewares.likes.addLikeToPost,
            middlewares.likes.addUserWhoLike,
            middlewares.likes.getLike,
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