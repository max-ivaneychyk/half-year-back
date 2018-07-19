const middlewares = require('../middlewares');

class WallsController {
    constructor () {
        this.createWall = [
            middlewares.token.checkToken,
            middlewares.walls.createWall,
            middlewares.walls.addWallToUser,
            middlewares.walls.getWallById,
            middlewares.sendAnswer
        ];
    }
}

module.exports = new WallsController;