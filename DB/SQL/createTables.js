let TABLES = require('../const/tables').TABLES;

module.exports = [

`CREATE TABLE IF NOT EXISTS ${TABLES.USERS} (
    id int PRIMARY KEY AUTO_INCREMENT,
    verified int DEFAULT 0,
    refreshToken varchar(500),
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

`CREATE TABLE IF NOT EXISTS ${TABLES.COMMENTS} (
    id int PRIMARY KEY AUTO_INCREMENT,
    ownerId int,
    text varchar(500),
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);`,

`CREATE TABLE IF NOT EXISTS ${TABLES.LIKES} (
    id int PRIMARY KEY AUTO_INCREMENT,
    ownerId int NOT NULL,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);`,

`CREATE TABLE IF NOT EXISTS ${TABLES.PHOTOS} (
    id int PRIMARY KEY AUTO_INCREMENT,
    url varchar(500) NOT NULL,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);`,

`CREATE TABLE IF NOT EXISTS ${TABLES.COMMENTS_TO_ENTITIES} (
    commentId int NOT NULL,
    entityType int NOT NULL,
    entityId int NOT NULL
);`,

`CREATE TABLE IF NOT EXISTS ${TABLES.LIKES_TO_ENTITIES} (
    likeId int NOT NULL,
    entityType int NOT NULL,
    entityId int NOT NULL
);`,
];