const middlewares = require('../middlewares');


class PhotoController {
    constructor() {
        // For Photos
        this.loadPhoto = [
            middlewares.token.checkToken,
            middlewares.photos.uploadPhoto,
            middlewares.sendAnswer
        ];
    }
}

module.exports = new PhotoController;