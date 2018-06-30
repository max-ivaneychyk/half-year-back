const middlewares = require('../middlewares');

class LikesController {
    constructor () {
        // For Posts
        this.setLikeToPost = [
            middlewares.token.checkToken,
            middlewares.likes.addLikeToPost,
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