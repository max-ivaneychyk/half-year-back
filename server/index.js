let config = require('../config');
let DB = require('../DB')(config.database);
let jwt = require('jsonwebtoken');


module.exports = {

    start (app) {
        app.get('/',  function(req, res) {
            let token = jwt.sign({ foo: 'bar' }, 'shhhhh');

            res.send(token)
        });

        console.log('Start server in port ', config.server.PORT)
    }
};


