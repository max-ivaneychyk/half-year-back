let config = require('../config');
// let DB = require('../DB')(config.database);
let jwt = require('jsonwebtoken');
let {userRegistrationValidator} = require('./validators/UserRegistrationValidator');


module.exports = {


    start (app) {
           // let token = jwt.sign({ foo: 'bar' }, 'shhhhh');

        app.use(function (req, res, next) {
            console.log('New req :> ',req.url);
            next();
        });
     
        app.route('/users')
            .post(userRegistrationValidator.validateWithMiddleware.bind(userRegistrationValidator)
            );


        app.use((err, req, res, next) => {
            res.json(err.details);
        });

        console.log('Start server in port ', config.server.PORT)
    }
};


