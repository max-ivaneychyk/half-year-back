let config = require('../config');
let router = require('./routes');
let database = require('../DB');
let bodyParser = require('body-parser');
let Logger = require('./utils/logger');

module.exports = {

    start (app) {

        database.connect(config.database);

        app.use(bodyParser.json({ limit: '50mb' }));
        app.use(bodyParser.raw({ limit: '50mb' }));
        app.use(bodyParser.urlencoded({ extended: false }));

    //    app.use(Logger.webPanel());
        app.use(Logger.logRequest);

        app.use('/api/v1', router.v1);

        app.use(Logger.errorLogger);
        // Error handler
        app.use( (err, req, res, next) => {
            res.status(err.code || 404).json({__v: '1.0', ...err});
        });

        app.use('**', function errorHandler (req, res) {
            console.warn('[404] ', req.url);
            res.status(404).send();
        });

        return () => console.log('Start server in port ', config.server.PORT)
    }
};


