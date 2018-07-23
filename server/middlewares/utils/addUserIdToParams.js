

module.exports = function (req, res, next) {
    let userID = req.getSessionData().payload.id;

    if (!userID) {
        return next({message: 'Error :userId not fount in session'});
    }

    req.params.userId = userID;

    next();
};