const middlewares = require('../middlewares');
const {photosUploader} = require('../utils/multer');
const IMAGE_FIELD = 'photos';



class PhotoController {
    constructor() {
        // For Photos
        this.loadPhoto = [
            middlewares.token.checkToken,
            photosUploader.array(IMAGE_FIELD, 10),
            middlewares.photos.uploadPhoto,
            middlewares.sendAnswer
        ];
    }
}

module.exports = new PhotoController;