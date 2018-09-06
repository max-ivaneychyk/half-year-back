const middlewares = require('../middlewares');
const Controller = require('./Controller');

class LikesController extends Controller {
    constructor () {
        super();
        // For Posts
        this.setLikeToPost = [
            this.checkToken,
            middlewares.likes.createLike,
            middlewares.likes.addLikeToPost,
            middlewares.likes.addUserWhoLike,
            middlewares.likes.getLike,
            this.sendAnswer
        ];

        this.setLikeToComment = [
            this.checkToken,
            middlewares.likes.createLike,
            middlewares.likes.addLikeToComment,
            middlewares.likes.addUserWhoLike,
            middlewares.likes.getLike,
            this.sendAnswer
        ];

        this.deleteLike = [
            this.checkToken,
            middlewares.likes.removeLike,
            this.sendAnswer
        ];
    }
}

module.exports = new LikesController;