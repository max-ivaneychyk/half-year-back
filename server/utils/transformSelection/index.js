const _ = require('lodash');

function customizer(objValue, srcValue) {
    if (_.isArray(objValue)) {
        return objValue.concat(srcValue);
    }
}

let utils = {
    groupJoinData: (rows, uniq = 'id') => {
        let store = {};

        rows.forEach((row) => {
            let tempRow = {};

            _.forOwn(row, (value, key) => {
                _.set(tempRow, key, value);
            });

            if (!store[tempRow[uniq]]) {
                store[tempRow[uniq]] = tempRow;
                return;
            }

            store[tempRow[uniq]] = _.mergeWith(tempRow, store[tempRow[uniq]], customizer);
        });

        return Object.values(store);
    },
    clearEmptyArrays : (list, listKeysForCheck = []) => {

        list.forEach(data => {
           listKeysForCheck.forEach(checkConf => {
               let val = _.get(data, checkConf.checkKey);

               if (val === null) {
                   _.set(data, checkConf.ifEmptySet.key, checkConf.ifEmptySet.value);
               }
           })
        });

        return list;
    }
};




module.exports = utils;