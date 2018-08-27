const middlewares = require('../middlewares');
const Validator = require('../validators/Validator');
const entities = require('../entities');
const constants = require('../const');

let {
    PostModel
} = require('../models/index');
let {
    groupJoinData,
    CHECK_KEYS
} = middlewares.utils.joiner;

class PostController {
    constructor() {
        this.$getPostById = [
            this._getPostById,
            groupJoinData([CHECK_KEYS.PHOTOS, CHECK_KEYS.COMMENTS]),
        ];

        this.addNewPost = [
            Validator.create(PostModel).body,
            middlewares.token.checkToken,
            middlewares.utils.addUserIdToParams,
            this._addNewPost,
            this._addUserToPost,
            this._addPostToWall,
            this._addPhotosToPost,
            ...this.$getPostById,
            middlewares.sendAnswer
        ];

        this.editPostById = [];

        this.getPostById = [
            middlewares.token.checkToken,
            ...this.$getPostById,
            middlewares.sendAnswer
        ];

        this.deletePost = [
            middlewares.token.checkToken,
            this._deletePost,
            middlewares.sendAnswer
        ];

        this.getList = [
            middlewares.token.checkToken,
            middlewares.utils.addUserIdToParams,
            this._getPosts,
            groupJoinData([CHECK_KEYS.PHOTOS, CHECK_KEYS.COMMENTS]),
            this._addPagination,
            middlewares.sendAnswer
        ]
    }

    _addPhotosToPost(req, res, next) {
        let {
            photos
        } = req.body;
        let {
            postId
        } = req.params;
        return entities.posts.addPhotosToPost({
            postId,
            photos
        }).then(() => {
            next();
        }).catch(next);
    }

    _addNewPost(req, res, next) {
        return entities.posts.addNewPost({
            text: req.body.text
        }).then(([row]) => {
            req.params.postId = row.insertId;
            next();
        }).catch(next);
    }

    _addPostToWall(req, res, next) {
        return entities.posts.addPostToWall(req.params).then(() => {
            next();
        }).catch(next);
    }

    _addUserToPost(req, res, next) {
        return entities.posts.addUserToPost(req.params).then(() => {
            next();
        }).catch(next);
    }

    _deletePost(req, res, next) {
        return entities.posts.deletePost(req.params).then(() => {
            res.status(constants.STATUS_CODE.CONTENT_WAS_DELETED);
            req.ans.clear();
            next();
        }).catch(next);
    }

    _getPostById(req, res, next) {
        return entities.posts.getPostById(req.params).then(([rows]) => {
            req.ans.set({
                data: rows
            });
            next();
        }).catch(next);
    }

    _getPosts(req, res, next) {
        return entities.posts.getPosts(req.params, req.query).then(([rows]) => {
            req.ans.set({
                data: rows
            });
            next();
        }).catch(next);
    }

    _addPagination(req, res, next) {
        let limit = req.query.limit || 10;
        let offset = req.query.offset || 0;
        let page = offset / limit;

        return entities.posts.addPagination(req.params).then(([rows]) => {
            let total = rows[0].countPosts;

            req.ans.merge({
                pagination: {
                    nextOffset: (page + 1) * limit,
                    nextPage: page + 1,
                    total
                }
            });

            next();
        }).catch(next);
    }

}

module.exports = new PostController;