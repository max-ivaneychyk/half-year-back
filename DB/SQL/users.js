let TABLES = require('../const/tables').TABLES;


let users = {
    add: (fields, values) => `INSERT INTO ${TABLES.USERS}  (${fields}) VALUES (${values});`,
    selectAll: ()  => `SELECT * FROM  ${TABLES.USERS}`,
    selectById: id => `SELECT * FROM ${TABLES.USERS}  WHERE id=${id}`
};

module.exports = users;