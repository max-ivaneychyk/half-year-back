let utils = require('../../utils/transformSelection');

module.exports = function (req, res, next) {
    let files = req.files;
    console.log(files);

    next();
};