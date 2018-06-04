let constants = require('../const');

module.exports = function (req, res, next) {

    delete res[constants.RES_DATA].session;

    next();
};