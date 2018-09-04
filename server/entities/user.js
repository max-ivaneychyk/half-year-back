const database = require('../../DB').connect();


// TODO: Pagination

class User {
    updateStatusOnline (params) {
        let {userId, isOnline} = params;
        let sql = `UPDATE Online SET isOnline=? WHERE userId=?;`;
        return database.query(sql, [isOnline, userId]);
    }

    signIn (params) {
        let {email, password} = params;
        let query = `
        SELECT  
        Users.id, 
        Users.firstName,
        Users.lastName,
        Walls.id AS 'walls[0].id',
        Walls.title AS 'walls[0].title',
        (SELECT url 
            FROM Photos
            WHERE (
                SELECT photoId 
                FROM Avatars 
                WHERE Avatars.ownerId=Users.id 
                ORDER BY createdAt DESC 
                LIMIT 1)= Photos.id) 
        AS avatarUrl,
        Authorization.verified
        
        FROM Users 

        INNER JOIN Authorization 
            ON Authorization.email=? 
            AND Authorization.password=? 
            AND Users.id=Authorization.id
        LEFT JOIN UsersWalls 
            ON Users.id=UsersWalls.userId
        LEFT JOIN Walls 
            ON UsersWalls.wallId = Walls.id
        `;
    
        return database.query(query, [email, password])
    }

    getUserProfileById (params) {
        let {userId} = params;
        let query = `
       SELECT 
            Users.id,
            Users.firstName, 
            Users.lastName, 
            Users.status,
        (SELECT url
            FROM Photos
            WHERE (
                SELECT photoId
                FROM Avatars
                WHERE Avatars.ownerId=Users.id ORDER BY createdAt DESC LIMIT 1)=Photos .id)
        AS avatarUrl,
        Walls.id AS 'walls[0].id', 
        Walls.title AS 'walls[0].title'
    
        FROM Users
        LEFT JOIN UsersWalls ON Users.id=UsersWalls.userId
        LEFT JOIN Walls ON UsersWalls.wallId=Walls.id
        WHERE Users.id = ?
        `;
    
        return database.query(query, [userId]);
    }

    updateTextStatus (params) {
        let {userId, status} = params;
        let sql = `UPDATE Users SET status=? WHERE id=?;`;
        return database.query(sql, [status, userId]);
    }

}



module.exports = new User;