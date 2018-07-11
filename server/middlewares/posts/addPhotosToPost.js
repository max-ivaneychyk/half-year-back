let constants = require('../../const');
const {POSTS_PHOTOS} = constants.TABLES;
let database = require('../../../DB');
let errorMessages = require('../../errors/errorMessages');
let AppError = require('../../errors');

module.exports = function addPost (req, res, next) {
    let postId = req.params.postId;
    let photos = req.body.photos || [];
    let placeholder = [];
    let sql, values;

    if (!photos.length) {
        return next();
    }

    photos.forEach(photoId => placeholder.push(postId, photoId));

    values = Array(placeholder.length/2).fill('(?, ?)').join(', ');
    sql = `INSERT INTO ${POSTS_PHOTOS} (postId, photoId) VALUES ${values}; `;

    database.query(sql, placeholder).then(() => {
        next();
    }).catch(e => {
        let err = AppError.create(e);
        next(err);
    })
};