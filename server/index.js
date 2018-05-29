let config = require('../config');
// let DB = require('../DB')(config.database);
let jwt = require('jsonwebtoken');
let models = require('./models');


module.exports = {


    start (app) {
           // let token = jwt.sign({ foo: 'bar' }, 'shhhhh');

        app.use(function (req, res, next) {
            console.log('New req :> ',req.url);
            next();
        });
     
        app.route('/users')
            .post((req, res, next) => {
                    let {error, value} = models.UserRegistrationModel.validate(req.body);
                    res.send(error || value);
                });



        console.log('Start server in port ', config.server.PORT)
    }
};


