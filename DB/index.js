const mysql = require('mysql2');
const CREATE_TABLES_QUERY_LIST = require('./SQL/createTables');


module.exports = function (conf) {

    // create the connection to database
    const pool = mysql.createPool({
        connectionLimit : 10,
        host: conf.HOST,
        user: 'root',
        database: 'half'
    });

    pool.getConnection(function(err, db) {
        // Use the connection
        CREATE_TABLES_QUERY_LIST.forEach(query => {
            db.query(query, function (error, rows, fields) {
                // Handle error after the release.
                if (error) throw error;
            });
        })
    })
};




