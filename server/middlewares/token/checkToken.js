let entities = require('../../entities')
let tokenService = require('../../utils/token');

module.exports = function (req, res, next) {
    entities.token.checkToken(req.headers.authorization, tokenService.SECRET_KEY)
        .then(() => {
            next()
        })
        .catch(next)
};