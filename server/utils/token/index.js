const jwt = require('jsonwebtoken');
const {TOKEN_EXP_TIME} = require('../../const');
const SECRET_KEY = 'secret';

class TokenService {
    encryptToken (userData) {
        let exp = Math.floor(Date.now() / 1000) + (TOKEN_EXP_TIME);
        return jwt.sign({payload: userData, exp}, SECRET_KEY);
    }

    decryptToken (token) {
        let payload = {err: null, payload: null};

        try {
            payload.payload = jwt.verify(token, SECRET_KEY, {complete: true}).payload;
        } catch(err) {
            payload.err = err;
        }

        return payload;
    }
}

module.exports = new TokenService();