let TABLES = require('../const/tables').TABLES;

module.exports = [

`CREATE TABLE IF NOT EXISTS ${TABLES.USERS} (
    id int PRIMARY KEY AUTO_INCREMENT,
    verified int DEFAULT 0,
    refreshToken varchar(255),
    password varchar(255) NOT NULL,
    lastName varchar(255),
    firstName varchar(255),
    email varchar(255) NOT NULL UNIQUE,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);`,

`CREATE TABLE IF NOT EXISTS ${TABLES.POSTS} (
    id int PRIMARY KEY AUTO_INCREMENT,
    ownerId int,
    description varchar(255),
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);`,

/*`CREATE TABLE IF NOT EXISTS ${TABLES.POST_TO_USERS} (
    postId int,
    userId int
);`,*/

`CREATE TABLE IF NOT EXISTS ${TABLES.PHOTOS} (
    id int PRIMARY KEY AUTO_INCREMENT,
    url varchar(255)
);`,

`CREATE TABLE IF NOT EXISTS ${TABLES.LIKES_TO_POSTS} (
    id int PRIMARY KEY AUTO_INCREMENT,
    postId int,
    userId int
);`



];