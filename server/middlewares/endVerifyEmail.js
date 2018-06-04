let database = require('../../DB');
let tokenService = require('../utils/token');

module.exports = function (req, res, next) {
    let token = req.params.token;
    let email = tokenService.decryptToken(token);
    let query = `UPDATE Users SET verified=1 WHERE email='${email}'`;

    if (!email) {
        return next({message: 'Email is empty'})
    }

    database.query(query).then(() => {
        next()
    }).catch(next);
};


