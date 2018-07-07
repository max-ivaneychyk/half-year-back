let utils = require('../../utils/transformSelection');

module.exports = function (req, res, next) {
    let data = res.ans.get().data;
    let isArray = Array.isArray(data);

    data = utils.groupJoinData( isArray ? data : [data] );

    if (!isArray) {
        data = data[0]
    }

    res.ans.merge({data});
    next();
};