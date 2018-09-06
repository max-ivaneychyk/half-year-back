let database = require('../../../DB');

module.exports = function (req, res, next) {
    let token = req.params.token;
    let query = `UPDATE Authorization SET verified=1 WHERE refreshToken=?`;

    database.query(query, [token]).then(() => {
        next()
    }).catch(next);
};


