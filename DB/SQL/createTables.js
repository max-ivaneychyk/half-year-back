let TABLES = require('../const/tables').TABLES;

module.exports = [

`CREATE TABLE IF NOT EXISTS ${TABLES.USERS} (
    id int PRIMARY KEY AUTO_INCREMENT,
    verified int DEFAULT 0,
    token varchar(255),
    password varchar(255) NOT NULL,
    lastName varchar(255),
    firstName varchar(255),
    email varchar(255) NOT NULL UNIQUE
);`,

`CREATE TABLE IF NOT EXISTS ${TABLES.POSTS} (
    id int PRIMARY KEY AUTO_INCREMENT,
    description varchar(255)
);`,

`CREATE TABLE IF NOT EXISTS ${TABLES.POST_TO_USERS} (
    postId int,
    userId int
);`,

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