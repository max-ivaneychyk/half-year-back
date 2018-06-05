
let conf = {
    PORT: 4200,
    PROTOCOL: 'http://',
    HOST: '127.0.0.1',
    FULL_PATH: null
};

conf.FULL_PATH = `${conf.PROTOCOL}${conf.HOST}:${conf.PORT}`;

module.exports = conf;