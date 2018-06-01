const mysql = require('mysql2/promise');
const CREATE_TABLES_QUERY_LIST = require('./SQL/createTables');
const USERS = require('./SQL/Users');

// TODO: NEED Protect from SQL injection attacks

class Database {
    constructor() {
        this.pool = null;
        this.connected = false;
    }

    connect(conf) {
        this.pool = mysql.createPool(conf);
        this.connected = true;
    }

    async disconnect() {
        this.connected = false;
        return await this.pool.end();
    }

    async query (query) {
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

const POOL_CONF = {
    connectionLimit: 10,
    host: '127.0.0.1',
    password: 'password',
    user: 'root',
    database: 'half'
};

let model = {
    firstName: 'Max',
    lastName: 'Max'
};

let database = new Database;
let {fields, values} = database.prepareModel(model);
let query = USERS.addUser(fields, values);

database.connect(POOL_CONF);

database.query(query).then(res => {
    console.log(res[0]);
}, err => console.log(err) );

database.query( USERS.selectUsers() ).then(res => {
    res[0].forEach(row => console.log('>>>>', row));
}, err => console.log(err) );

