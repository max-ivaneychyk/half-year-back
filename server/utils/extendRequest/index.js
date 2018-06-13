const tokenService = require('../token');

module.exports = function (req, res, next) {
    req.getSessionData = () => {
        return tokenService.decryptToken(req.headers.authorization);
    };

    res.ans = {
        __ans: {},
        get: () => {
            return this.__ans;
        },
        merge: obj => {
            this.__ans = {...this.__ans, ...obj }
        },
        set:  obj => {
            this.__ans = {...obj}; 
        },
        clear: () => {
            this.__ans = {}; 
        }
    };

    next();
};