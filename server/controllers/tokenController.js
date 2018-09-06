const middlewares = require('../middlewares');
const entities = require('../entities');
let Controller = require('./Controller');

class TokenController extends Controller {
    constructor() {
        super();

        this.refreshToken = [
            this._getUserIdFromToken,
            this.putSession,
            this.sendAnswer
        ];
    }

    putSession(req, res, next) {
        let {userId} = req.params;
        entities.token.updateSession({userId})
            .then(session => {
                req.ans.merge({
                    session
                });
                next()
            })
            .catch(next);
    }

    _getUserIdFromToken(req, res, next) {
        entities.token.findUserIdByRefreshToken(req.body)
            .then(([rows]) => {
                if (!rows.length) {
                    return next({code: 403, message: 'Invalid refresh token'})
                }

                req.params.userId = rows[0].id;
                next();
            })
            .catch(next);
    }
}

module.exports = new TokenController;