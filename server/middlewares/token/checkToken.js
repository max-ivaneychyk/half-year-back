
module.exports = function addPost (req, res, next) {
    let {payload, err} = req.getSessionData();

    if (!err) {
        return next();
    }

    if (err.name === 'TokenExpiredError') {
        // refresh token
    }

    return next(err);
};
