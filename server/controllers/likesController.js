const middlewares = require('../middlewares');
const Controller = require('./Controller');
const entities = require('../entities');

class LikesController extends Controller {
    constructor() {
        super();
        // For Posts
        this.setLikeToPost = [
            this.checkToken,
            this.addUserIdToParams,
            this._addLikeToPost,
            this._getLike,
            this.sendAnswer
        ];

        this.setLikeToComment = [
            this.checkToken,
            this.addUserIdToParams,
            this._addLikeToComment,
            this._getLike,
            this.sendAnswer
        ];

        this.deleteLike = [
            this.checkToken,
            this._removeLike,
            this.sendAnswer
        ];
    }

    _addLikeToPost(req, res, next) {
        entities.likes.createLike()
            .then(([rows]) => {
                req.params.likeId = rows.insertId;

                return entities.likes.attachToPost({
                    likeId: req.params.likeId,
                    postId: req.params.postId
                });
            })
            .then(() => entities.likes.saveUserWhoLike({
                likeId: req.params.likeId,
                userId: req.params.userId
            }))
            .then(() => next())
            .catch(next)
    }

    _addLikeToComment(req, res, next) {
        entities.likes.createLike()
            .then(([rows]) => {
                req.params.likeId = rows.insertId;

                return entities.likes.attachToComment({
                    likeId: req.params.likeId,
                    commentId: req.params.commentId
                });
            })
            .then(() => entities.likes.saveUserWhoLike({
                likeId: req.params.likeId,
                userId: req.params.userId
            }))
            .then(() => next())
            .catch(next)
    }

    _removeLike(req, res, next) {
        entities.likes.removeLike({likeId: req.params.likeId})
            .then(() => next())
            .catch(next)
    }

    _getLike(req, res, next) {
        entities.likes.getLike({likeId: req.params.likeId})
            .then(([rows]) => {
                req.ans.set({data: rows[0]});
                next();
            })
            .catch(next)
    }
}

module.exports = new LikesController;