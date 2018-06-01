let TABLES = require('../const/tables').TABLES;

module.exports = [
`CREATE TABLE IF NOT EXISTS ${TABLES.REGISTRATION_USERS} (
    id int NOT NULL AUTO_INCREMENT,
    token varchar(255)
);`,

`CREATE TABLE IF NOT EXISTS ${TABLES.USERS} (
    id int PRIMARY KEY AUTO_INCREMENT,
    verified int DEFAULT 0,
    token varchar(255),
    lastName varchar(255),
    firstName varchar(255),
    email varchar(255)
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