let constants = require('../const/index');

module.exports = function (req, res) {
    let data = req[constants.RES_DATA] || {};
    console.log('Ans >>>', res.statusCode, data);
    res.json(data);
};