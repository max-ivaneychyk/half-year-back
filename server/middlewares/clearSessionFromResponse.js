let constants = require('../const');

module.exports = function (req, res, next) {

    delete res.ans.get().session;

    next();
};