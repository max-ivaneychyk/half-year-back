const jwt = require('jsonwebtoken');
const {TOKEN_EXP_TIME, REFRESH_TOKEN_EXP_TIME} = require('../../const');
const SECRET_KEY = 'secret';
const SUPER_SECRET_KEY = 'super_secret';

class TokenService {
    encryptToken (userData) {
        let exp = Math.floor(Date.now() / 1000) + (TOKEN_EXP_TIME);
        return jwt.sign({payload: userData, exp}, SECRET_KEY);
    }

    decryptToken (token, secret = SECRET_KEY) {
        let payload = {err: null, payload: null};

        try {
            payload.payload = jwt.verify(token, secret, {complete: true}).payload;
        } catch(err) {
            payload.err = err;
        }

        return payload;
    }

    generateRefreshToken (userData) {
        let exp = Math.floor(Date.now() / 1000) + (REFRESH_TOKEN_EXP_TIME);
        return jwt.sign({payload: {id: userData.id}, exp}, SUPER_SECRET_KEY);
    }

    decryptRefreshToken (token) {
        return this.decryptToken(token, SUPER_SECRET_KEY);
    }
    
}

module.exports = new TokenService();