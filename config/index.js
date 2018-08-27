let serverConf = require('./server');
let dbConf = require('./db');
let frontend = require('./frontend');
let redis = require('./redis');

module.exports = {
    server: serverConf,
    database: dbConf,
    frontend,
    redis
};

