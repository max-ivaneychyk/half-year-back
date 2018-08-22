
const ERRORS = require('../../errors/errorMessages')


module.exports = function (req, res, next) {
    let {payload, err} = req.getSessionData();

    if (!err) {
        return next();
    }

    if (err.name === 'TokenExpiredError') {
        return next(ERRORS.TOKEN_EXPIRED);
    }

    return next(err);
};
