let constants = require('../const');

module.exports = function (req, res, next) {

    delete req.ans.get().session;

    next();
};