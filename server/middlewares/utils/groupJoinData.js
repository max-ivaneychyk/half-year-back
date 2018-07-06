let utils = require('../../utils/transformSelection');

module.exports = function (req, res, next) {
    res.ans.merge({ data: utils.groupJoinData(res.ans.get().data ) });
    next();
};