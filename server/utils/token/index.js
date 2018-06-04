const jwt = require('jsonwebtoken');
const SECRET_KEY = 'secret';

class TokenService {
    encryptToken (userData) {
        return jwt.sign(userData, SECRET_KEY);
    }

    decryptToken (token) {
        return jwt.verify(token, SECRET_KEY);
    }
}

module.exports = new TokenService();