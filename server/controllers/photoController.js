const entities = require('../entities');
const {photosUploader} = require('../utils/multer');
const IMAGE_FIELD = 'image';
const Controller = require('./Controller');


class PhotoController extends Controller {
    constructor() {
        super();
        // For Photos
        this.loadPhoto = [
            this.checkToken,
            photosUploader.array(IMAGE_FIELD, 10),
            this.uploadOnePhoto,
            this.sendAnswer
        ];
    }
}

module.exports = new PhotoController;