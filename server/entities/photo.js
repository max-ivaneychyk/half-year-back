const database = require('../../DB').connect();

class Photo {

    uploadOnePhoto(params) {
        let files = params.files;
        let file = files[0];
        let sql = `INSERT INTO Photos (url) VALUES (?); `;
        let path = file.path.replace(global.NODE_PATH, '');
        let placeholder = [path];

        return database.query(sql, placeholder).then((rows) => {
            return {
                id: rows[0].insertId,
                url: path
            }
         });
    }
}

module.exports = new Photo;