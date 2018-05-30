let TABLES = require('../const/tables').TABLES;

module.exports = [
`CREATE TABLE IF NOT EXISTS ${TABLES.REGISTRATION_USERS} (
    ID int,
    Token varchar(255)
);`,

`CREATE TABLE IF NOT EXISTS ${TABLES.USERS} (
    ID int,
    Verified int DEFAULT 0,
    Token varchar(255),
    LastName varchar(255),
    FirstName varchar(255),
    Email varchar(255)
);`,

`CREATE TABLE IF NOT EXISTS ${TABLES.POSTS} (
    ID int,
    Description varchar(255)
);`,

`CREATE TABLE IF NOT EXISTS ${TABLES.PHOTOS} (
    ID int,
    Url varchar(255)
);`,

`CREATE TABLE IF NOT EXISTS ${TABLES.LIKES_TO_POSTS} (
    ID int,
    PostID int,
    UserID int
);`



];