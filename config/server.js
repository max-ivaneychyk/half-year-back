
let conf = {
    PORT: 3000,
    HOST: '127.0.0.1',
    PROTOCOL: 'http://',
    FULL_PATH: null
};

conf.FULL_PATH = `${conf.PROTOCOL}${conf.HOST}:${conf.PORT}`;

module.exports = conf;