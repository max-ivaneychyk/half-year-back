const tokenService = require('../token');

module.exports = function (req, res, next) {
    req.getSessionData = () => {
        return tokenService.decryptToken(req.headers.authorization);
    };

    req.ans = {
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
            // temp store answers
            req.params.__ans = {};
        }
    };

    req.ans.clear();

    next();
};