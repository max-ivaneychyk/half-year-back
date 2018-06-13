let constants = require('../const/index');
let Logger = require('../utils/logger');

module.exports = function (req, res) {
    let data = res.ans.get();
    Logger.logResponse(req, res);
    res.json(data);
};