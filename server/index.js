let config = require('../config');
let router = require('./routes');
let database = require('../DB');
let bodyParser = require('body-parser');

module.exports = {

    start (app) {

        database.connect(config.database);

        app.use(bodyParser.json({ limit: '50mb' }));
        app.use(bodyParser.raw({ limit: '50mb' }));
        app.use(bodyParser.urlencoded({ extended: false }));

        app.use(function logger (req, res, next) {
            console.log('Req <<<', req.method, req.url, req.body);
            next();
        });

        app.use('/api', router.api);

        app.use(function errorHandler (err, req, res, next) {
            console.log('Ans >>>', res.statusCode, err);
            res.json(err);
        });

        return () =>  console.log('Start server in port ', config.server.PORT)
    }
};


