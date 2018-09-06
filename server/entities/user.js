const database = require('../../DB').connect();
let tokenService = require('../utils/token');


// TODO: Pagination

class User {
    updateStatusOnline(params) {
        let {
            userId,
            isOnline
        } = params;
        let sql = `UPDATE Online SET isOnline=? WHERE userId=?;`;
        return database.query(sql, [isOnline, userId]);
    }

    signIn(params) {
        let {
            email,
            password
        } = params;
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

    getUserProfileById(params) {
        let {
            userId
        } = params;
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

    getUserFullProfileById(params) {
        let {
            userId
        } = params;

        let query = `
       SELECT 
            Users.id,
            Users.firstName, 
            Users.lastName, 
            Users.status,
            UsersInfo.dateOfBirth,
            UsersInfo.gender,
            UsersInfo.about,
            UsersInfo.phone,
            UsersInfo.email,
            UsersInfo.hometown,
            UsersInfo.cityOfResidence,
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
        INNER JOIN UsersInfo ON Users.id = UsersInfo.userId
        LEFT JOIN UsersWalls ON Users.id=UsersWalls.userId
        LEFT JOIN Walls ON UsersWalls.wallId=Walls.id
        WHERE Users.id = ?
        `;

        return database.query(query, [userId]);
    }

    updateTextStatus(params) {
        let {
            userId,
            status
        } = params;
        let sql = `UPDATE Users SET status=? WHERE id=?;`;
        return database.query(sql, [status, userId]);
    }

    setAdditionalInfo(params) {
        let {
            userId,
            dateOfBirth,
            gender,
            about,
            phone,
            email,
            hometown,
            cityOfResidence
        } = params;

        let sql = `
        INSERT INTO UsersInfo (userId, dateOfBirth, gender, about, phone, email, hometown,  cityOfResidence)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

        return database.query(sql, [
            userId,
            dateOfBirth,
            gender,
            about,
            phone,
            email,
            hometown,
            cityOfResidence
        ]);
    }

    registerNewUser(params) {
        let {firstName, lastName, email, password} = params;
        let token = tokenService.generateRefreshToken({email});
        let sqlSecurityInfo = `INSERT INTO Authorization (email, password, refreshToken) VALUES (?, ?, ?);`;
        let sqlAddUser = `
        INSERT INTO Users (firstName, lastName) VALUES (?, ?);
        INSERT INTO Online (userId, isOnline) VALUES (LAST_INSERT_ID(), 0);
    `;

        return database.query(sqlSecurityInfo, [email, password, token])
            .then(() => database.query(sqlAddUser, [firstName, lastName]))
            .then(() => token)
    }

    saveAvatarId(params) {
        let placeholder = [params.userId, params.avatarId];
        let sql = `INSERT INTO Avatars (ownerId, photoId) VALUES (?, ?); `;

        return database.query(sql, placeholder);
    }

    searchUsers(params) {
        let {userId} = params;
        let query = `
            SELECT  Users.id, Users.firstName, Users.lastName, 
            (
              SELECT Photos.url 
              FROM Avatars, Photos 
              WHERE ownerId=Users.id AND Avatars.photoId=Photos.id 
              ORDER BY Avatars.createdAt DESC 
              LIMIT 1
            ) AS 'avatarUrl'
            FROM Users
            WHERE Users.id != ? AND Users.id NOT IN (SELECT friendId FROM Friends WHERE myId = ?)
            LIMIT 10
        `;

        return database.query(query, [userId, userId])
    }

}


module.exports = new User;