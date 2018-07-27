let utils = require('../../utils/transformSelection');

const CHECK_KEYS = {
  COMMENTS: 'comments',
  PHOTOS: 'photos',
  WALLS: 'walls',
};

let clearPlaces = {
    [CHECK_KEYS.COMMENTS]: {
        checkKey: 'lastComment.id',
        ifEmptySet: {
            key: 'lastComment',
            value: null
        }
    },
    [CHECK_KEYS.PHOTOS]: {
        checkKey: 'photos[0].id',
        ifEmptySet: {
            key: 'photos',
            value: []
        }
    },
    [CHECK_KEYS.WALLS]: {
        checkKey: 'walls[0].id',
        ifEmptySet: {
            key: 'walls',
            value: []
        }
    }
};

function groupJoinData(keysForCheck = []) {
    let _clearPlacesList = keysForCheck.map(key => clearPlaces[key]);

    return function (req, res, next)  {
        let data = req.ans.get().data;
        let isArray = Array.isArray(data);


        data = utils.groupJoinData(isArray ? data : [data]);

        if (_clearPlacesList.length) {
            data = utils.clearEmptyArrays(data, _clearPlacesList);
        }

        if (!isArray) {
            data = data[0]
        }

        req.ans.merge({data});

        next();
    }
}

module.exports = {
    groupJoinData,
    CHECK_KEYS
};