const mysql = require('mysql2/promise');
const CREATE_TABLES_QUERY_LIST = require('./SQL/createTables');
let Logger = require('../server/utils/logger')

// TODO: NEED Protect from SQL injection attacks
// TODO: execute > `CREATE DATABASE IF NOT EXISTS half DEFAULT CHARACTER SET utf8;`

class Database {
    constructor() {
        this.pool = null;
        this.connected = false;
    }

    connect(conf) {
        this.pool = mysql.createPool({...conf, multipleStatements: true});
        this.listQueries(CREATE_TABLES_QUERY_LIST);
        this.connected = true;
    }

    async disconnect() {
        this.connected = false;
        return await this.pool.end();
    }

    async listQueries (queries) {
        return await Promise.all(queries.map(query => this.query(query)))
    }

    async query (query) {
        Logger.sqlQuery(query);
        return await this.pool.query(query)
    }

    normalizeTableFields (model) {
        return Object.keys(model).join(', ')
    }

    normalizeTableFieldValues (model) {
        return Object.values(model).map(val => typeof val === 'string' ? `'${val}'` : val).join(', ')
    }

    prepareModel (model) {
        return {
            fields: this.normalizeTableFields(model),
            values: this.normalizeTableFieldValues(model)
        }
    }
}

module.exports = new Database;
