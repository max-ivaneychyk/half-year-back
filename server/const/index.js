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


exports.RES_DATA = '__res_answer_data';
exports.REQ_DATA = '__req__data';
exports.STATUS = '__res_status';


exports.TOKEN_EXP_TIME = 3600;
exports.REFRESH_TOKEN_EXP_TIME = 3600;
