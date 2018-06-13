let constants = require('../const/index');
let Logger = require('../utils/logger');

module.exports = function (req, res) {
    let data = res.ans.get();
    console.log('Ans >>>', res.statusCode, data);
    res.json(data);
};