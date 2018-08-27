let multer  = require('multer');
const CONSTANTS = require('../../const');
const path = require('path');
const uuidv4 = require('uuid/v4');

let storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, path.join(global.NODE_PATH, CONSTANTS.PATH_UPLOAD_IMAGES));
    },
    filename: function (req, file, callback) {
        let name = file.fieldname + '-' + uuidv4() +  path.extname(file.originalname);
        callback(null, name);
    }
});

let photosUploader = multer({
    storage,
    fileFilter: function (req, file, cb) {
        let formats = ['jpeg', 'jpg', 'png', 'gif', 'webp', 'svg'];
        let fileTypes = new RegExp(`${formats.join('|')}`, 'i');
        let mimeType = fileTypes.test(file.mimetype);
        let extName = fileTypes.test(file.originalname);

        if (mimeType && extName) {
            return cb(null, true);
        }

        cb(`Error: File upload only supports the following filetypes - ${formats.join(', ')}`);
    }
});


module.exports = photosUploader;