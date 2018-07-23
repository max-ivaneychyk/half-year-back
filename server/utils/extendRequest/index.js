const tokenService = require('../token');

module.exports = function (req, res, next) {
    req.getSessionData = () => {
        return tokenService.decryptToken(req.headers.authorization);
    };

    res.ans = {
        get: () => {
            return req.params.__ans;
        },
        merge: obj => {
            req.params.__ans = {...req.params.__ans, ...obj }
        },
        set:  obj => {
            req.params.__ans = {...obj};
        },
        clear: () => {
            // temp store answer for list middlevares
            req.params.__ans = {};
        }
    };

    res.ans.clear();

    next();
};