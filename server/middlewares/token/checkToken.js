
module.exports = function addPost (req, res, next) {
    let {payload, err} = req.getSessionData();

    if (err) {
        return next(err);
    }

    next();
};
