const conf = require('../../../config').redis;
const {TOKEN_EXP_TIME} = require('../../const');
const client = redis.createClient({
    host: conf.host,
    port: conf.port
});


client.on('reconnecting', (param) => {
    console.warn('Redis connection has not been established. Reconnecting... Attempt: %s ', param.attempt);
    console.error('Web server is going to shut down. Disconnecting...');
});

client.on('connect', () => {
    console.log(`connected to redis`);
});

client.on('error', err => {
    console.log(`Error: ${err}`);
});

module.exports = {
    set: function (key, value) {
        client.setex(key, TOKEN_EXP_TIME, value);
    }
};