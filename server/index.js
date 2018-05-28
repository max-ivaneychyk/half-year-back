let config = require('../config');
// let DB = require('../DB')(config.database);
let jwt = require('jsonwebtoken');
let models = require('./models/model');

module.exports = {


    start (app) {
           // let token = jwt.sign({ foo: 'bar' }, 'shhhhh');

        app.use(function (req, res, next) {
            console.log('New req :> ',req.url);
            next();
        });
     
        app.route('/users')
            .post([(req, res, next) => {
                    next({l: 100000})
                    res.send('ggg');
                }, (err, req, res, next) => {

                res.send('OK')

            }]);

        let res = models.Model.UserRegistration({ username: 'abc', birthyear: 1994 })


        console.log('Start server in port ', config.server.PORT)
    }
};


