let multer  = require('multer');
const CONSTANTS = require('../../const');
const path = require('path');

let storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(global.NODE_PATH, CONSTANTS.PATH_UPLOAD_IMAGES));
    },
    filename: function (req, file, callback) {
        let name = file.fieldname + '-' + Date.now() +  path.extname(file.originalname);
        callback(null, name);
    }
});

let photosUploader = multer({
    storage,
    fileFilter: function (req, file, cb) {
        let fileTypes = /jpeg|jpg|png|gif/gmi;
        let mimeType = fileTypes.test(file.mimetype);
        let extName = fileTypes.test(file.originalname);

        if (mimeType && extName) {
            return cb(null, true);
        }

        cb(`Error: File upload only supports the following filetypes - ${fileTypes}`);
    }
});


module.exports = photosUploader;