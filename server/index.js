let config = require('../config');
let DB = require('../DB')(config.database);


module.exports = {

    start (app) {
        console.log('Start server')
    }
};