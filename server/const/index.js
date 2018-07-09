exports.STATUS_CODE = {
    OK: 200,
    CONTENT_WAS_DELETED: 204,
    REDIRECT: 302,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_ALLOWED: 405,
    CONFLICT: 409,
    GONE: 410,
    UNPROCESSABLE_ENTITY: 422,
    FAILED_DEPENDENCY: 424,
    INTERNAL_ERROR: 500,
    NOT_IMPLEMENTED: 501
};

exports.TABLES = require('../../DB/const/tables').TABLES;

exports.ENTITIES = require('../../DB/const/tables').ENTITIES;

exports.LIMIT = {
    COMMENTS_MIN: 3,
    COMMENTS_MAX: 10,
    USERS: 10,
    POSTS: 10
};


exports.PATH_UPLOAD_IMAGES = '/public/images/uploads/';

exports.TOKEN_EXP_TIME = 36000;
exports.REFRESH_TOKEN_EXP_TIME = 36000;
