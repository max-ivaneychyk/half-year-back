const tokenService = require('../token');

module.exports = function (req, res, next) {
    req.getSessionData = () => {
        return tokenService.decryptToken(req.headers.authorization);
    };



    next();
};