let database = require('../../DB');
let constants = require('../const/index');

module.exports = function (req, res, next) {
    let {email, password} = req.body;
    let query = `SELECT email, id, firstName, lastName, verified FROM Users WHERE email='${email}' AND password='${password}'`;

    database.query(query).then(([rows]) => {
        let data = rows[0];

        if (!data.verified) {
            return next({message: 'Your account not verified, please check your email'})
        }

        res[constants.RES_DATA] = data;

        next()
    }).catch(next);
};
