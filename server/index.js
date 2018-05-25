let config = require('../config');
let DB = require('../DB')(config.database);


module.exports = {
    start: function () {
        console.log('Start server')
    }
};