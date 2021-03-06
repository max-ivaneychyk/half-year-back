const entities = require('../entities');
const Controller = require('./Controller');

class WallsController extends Controller {
    constructor() {
        super();
        this.createWall = [
            this.checkToken,
            this.addUserIdToParams,
            this._createNewWall,
            this._addWallToUser,
            this._getWallById,
            this.sendAnswer
        ];

        this.renameWall = [
            this.checkToken,
            this.addUserIdToParams,
            this._renameWall,
            this._getWallById,
            this.sendAnswer
        ];

        this.deleteWall = [
            this.checkToken,
            this.addUserIdToParams,
            this._deleteWall,
            this.sendAnswer
        ];
    }

    _createNewWall(req, res, next) {
        entities.wall.createWall(req.body)
            .then(rows => {
                req.params.wallId = rows[0].insertId;
                next();
            })
            .catch(next)
    }
    _getWallById(req, res, next) {
        entities.wall.getWallById({
                wallId: req.params.wallId
            })
            .then(([rows]) => {
                req.ans.set({
                    data: rows[0]
                });
                next();
            })
            .catch(next)
    }
    _addWallToUser(req, res, next) {
        let params = {
            wallId: req.params.wallId,
            userId: req.params.userId
        };

        entities.wall.addWallToUser(params)
            .then(() => next())
            .catch(next)
    }

    _renameWall (req, res, next) {
        let params = {
            wallId: req.params.wallId,
            userId: req.params.userId,
            wallName: req.body.wallName
        };

         entities.wall.renameWall(params)
            .then(() => next())
            .catch(next)
    }

    _deleteWall (req, res, next) {
        let params = {
            wallId: req.params.wallId,
            userId: req.params.userId
        };

         entities.wall.deleteWall(params)
            .then(() => next())
            .catch(next)
    }
}

module.exports = new WallsController;