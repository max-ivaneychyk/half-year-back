let constants = require('../const/index');
let Logger = require('../utils/logger');

module.exports = function (req, res) {
    let data = req.ans.get();
    Logger.logResponse(req, res);
    res.json({__v: '1.0', ...data});
};