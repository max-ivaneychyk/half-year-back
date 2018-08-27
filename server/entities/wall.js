const database = require('../../DB').connect();

class Wall {
    createWall () {
        let sql = `INSERT INTO Walls (title) VALUES (?); `;
        let placeholder = ['title'];
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