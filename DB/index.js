const mysql = require('mysql2');
const CREATE_TABLES_QUERY_LIST = require('./SQL/createTables');


// TODO: NEED Protect from SQL injection attacks

module.exports = {
        connect: function (conf) {
            const POOL_CONF = {
                connectionLimit : 10,
                host: conf.HOST,
                user: 'root',
                database: 'half'
            };

/*            async function example2 () {
                let mysql = require('mysql2/promise');
                let pool = mysql.createPool(POOL_CONF);
                // execute in parallel, next console.log in 3 seconds
                await Promise.all([pool.query('select sleep(2)'), pool.query('select sleep(3)')]);
                console.log('3 seconds after');
                await pool.end();
            }*/

            // create the connection to database
            const pool = mysql.createPool(POOL_CONF);

            pool.getConnection(function(err, db) {
                // Use the connection
                CREATE_TABLES_QUERY_LIST.forEach(query => {
                    db.query(query, function (error, rows, fields) {
                        // Handle error after the release.
                        if (error) throw error;
                    });
                })
            })
        },
        normalizeTableFields: function(model) {
            return Object.keys(model).join(', ')
        },
        normalizeTableFieldValues: function(model) {
            return Object.values(model).map(val => typeof val === 'string' ? `'${val}'` : val).join(', ')
        }
};



