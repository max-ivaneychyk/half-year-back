let utils = require('../../utils/transformSelection');

let clearPlaces = {
    comments: {
        checkKey: 'comments[0].id',
        ifEmptySet: {
            key: 'comments',
            value: []
        }
    },
    photos: {
        checkKey: 'photos[0].id',
        ifEmptySet: {
            key: 'photos',
            value: []
        }
    },
    walls: {
        checkKey: 'walls[0].id',
        ifEmptySet: {
            key: 'walls',
            value: []
        }
    }
};

module.exports = function (req, res, next) {
    let data = res.ans.get().data;
    let isArray = Array.isArray(data);

    data = utils.groupJoinData( isArray ? data : [data] );
    data = utils.clearEmptyArrays(data, [clearPlaces.comments, clearPlaces.photos, clearPlaces.walls]);

    if (!isArray) {
        data = data[0]
    }

    res.ans.merge({data});
    next();
};