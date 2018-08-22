const database = require('../../DB').connect();
let tokenService = require('../utils/token/index');


class Token {
    findUserIdByRefreshToken (params) {
        let {refreshToken} = params;
        let sql = `SELECT id from Authorization where refreshToken = ?;`;
        return database.query(sql, [refreshToken]);
    }

    updateSession (params) {
        let {userId} = params;
        let sql = `UPDATE Authorization SET refreshToken=? WHERE id=? `;
        let session = {
            accessToken: tokenService.encryptToken({id: userId}),
            refreshToken: tokenService.generateRefreshToken({id: userId})
        };
    
        return database.query(sql, [session.refreshToken, userId]).then(() => session);
    }

}



module.exports = new Token;