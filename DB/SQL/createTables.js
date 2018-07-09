let TABLES = require('../const/tables').TABLES;

const FIELDS = {
    ID: 'id',
    EMAIL: 'email',
    PASSWORD: 'password'
};

module.exports = [
    `CREATE TABLE IF NOT EXISTS ${TABLES.AUTH} (
    ${FIELDS.ID} int PRIMARY KEY AUTO_INCREMENT,
    ${FIELDS.EMAIL} varchar(255) NOT NULL UNIQUE,
    ${FIELDS.PASSWORD} varchar(255) NOT NULL,
    verified int DEFAULT 0,
    refreshToken varchar(500) UNIQUE
);`,

    `CREATE TABLE IF NOT EXISTS ${TABLES.USERS} (
    id int PRIMARY KEY AUTO_INCREMENT,
    lastName varchar(255),
    firstName varchar(255),
    photoId int,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);`,

    `CREATE TABLE IF NOT EXISTS ${TABLES.WALLS} (
    id int PRIMARY KEY AUTO_INCREMENT,
    ownerId int,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);`,

    `CREATE TABLE IF NOT EXISTS ${TABLES.POSTS} (
    id int PRIMARY KEY AUTO_INCREMENT,
    ownerId int,
    wallId int,
    description varchar(255),
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);`,

    `CREATE TABLE IF NOT EXISTS ${TABLES.COMMENTS} (
    id int PRIMARY KEY AUTO_INCREMENT,
    ownerId int NOT NULL,
    recipientId int NOT NULL,
    entityId int NOT NULL,
    text varchar(500),
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);`,

    `CREATE TABLE IF NOT EXISTS ${TABLES.LIKES} (
    id int PRIMARY KEY AUTO_INCREMENT,
    ownerId int NOT NULL,
    recipientId int NOT NULL,
    entityId int NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);`,

    `CREATE TABLE IF NOT EXISTS ${TABLES.PHOTOS} (
    id int PRIMARY KEY AUTO_INCREMENT,
    url varchar(500) NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);`,


];