let config = require('../config');
let router = require('./routes');
let database = require('../DB');


module.exports = {

    start (app) {

        database.connect(config.database);

        app.use(function logger (req, res, next) {
            console.log('New req :> ',req.url);
            next();
        });

        app.use('/api', router.api);

        app.use(function errorHandler (err, req, res, next) {
            res.json(err.details);
        });

        console.log('Start server in port ', config.server.PORT)
    }
};


