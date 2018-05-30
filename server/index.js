let config = require('../config');
let DB = require('../DB');
let jwt = require('jsonwebtoken');
let {userRegistrationValidator} = require('./validators/UserRegistrationValidator');


module.exports = {
        // let token = jwt.sign({ foo: 'bar' }, 'shhhhh');

    start (app) {

        DB.connect(config.database);

        app.use(function (req, res, next) {
            console.log('New req :> ',req.url);
            next();
        });
     
        app.route('/users')
            .post([
                userRegistrationValidator.validateWithMiddleware.bind(userRegistrationValidator),
                (req, res, next) => {

                }
                ]
            );


        app.use((err, req, res, next) => {
            res.json(err.details);
        });

        console.log('Start server in port ', config.server.PORT)
    }
};


