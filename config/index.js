let serverConf = require('./server');
let dbConf = require('./db');
let frontend = require('./frontend');

module.exports = {
    server: serverConf,
    database: dbConf,
    frontend
};

