const mysql = require('mysql2/promise');
const CREATE_TABLES_QUERY_LIST = require('./const/createTables');
let Logger = require('../server/utils/logger');
let config = require('../config').database;

// TODO: NEED Protect from SQL injection attacks
// TODO: execute > `CREATE DATABASE IF NOT EXISTS half DEFAULT CHARACTER SET utf8;`

class Database {
    constructor() {
        this.pool = null;
        this.connected = false;
    }

    connect(conf) {
        this.pool = mysql.createPool({...(conf || config), multipleStatements: true});
   //     this.listQueries(CREATE_TABLES_QUERY_LIST);
        this.connected = true;
        return this;
    }

    async disconnect() {
        this.connected = false;
        return await this.pool.end();
    }

    async listQueries(queries, placeholders = []) {
        return await Promise.all(queries.map((query, index) => {
            return this.query(query, placeholders[index])
        }))
    }

    async query(query, placeholder = []) {
        Logger.sqlQuery(query);
        console.log(placeholder);
        // Using placeholder for protect api
        return await this.pool.query(query, placeholder);
    }

}

module.exports = new Database;
