const database = require('../../DB').connect();

class Wall {
    createWall (params) {
        let sql = `INSERT INTO Walls (title) VALUES (?); `;
        let placeholder = [params.wallName];
        return database.query(sql, placeholder);
    }

    renameWall (params) {
        let {wallName, wallId, userId} = params;
        let sql = `
        update Walls 
        inner join UsersWalls 
            on UsersWalls.userId = ? 
            and UsersWalls.wallId = Walls.id
        set Walls.title=? 
        where Walls.id =? 
        `;
        let placeholder = [userId, wallName, wallId];
        return database.query(sql, placeholder);
    }

    deleteWall (params) {
        let {wallId, userId} = params;
        let sql = `
        DELETE w 
        FROM Walls as w
        inner join UsersWalls
            on UsersWalls.userId = ?
            and UsersWalls.wallId = w.id
        where w.id =?
        `;
        let placeholder = [userId, wallId];
        return database.query(sql, placeholder);
    }

    getWallById (params) {
        let sql = `SELECT title, id FROM Walls WHERE id = ?; `;
        let placeholder = [params.wallId];
        return database.query(sql, placeholder);
    }

    addWallToUser (params) {
        let {userId, wallId} = params;
        let sql = `INSERT INTO UsersWalls (wallId, userId) VALUES (?, ?); `;
        let placeholder = [wallId, userId];
        return database.query(sql, placeholder);
    }
    
}

module.exports = new Wall;