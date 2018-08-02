const database = require('../../DB').connect();


// TODO: Pagination

class User {
    updateStatusOnline (params) {
        let {userId, isOnline} = params;
        let sql = `UPDATE Online SET isOnline=? WHERE userId=?;`;
        return database.query(sql, [isOnline, userId]);
    }

}



module.exports = new User;