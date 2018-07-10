let TABLES = require('../const/tables').TABLES;

module.exports = [

`CREATE TABLE IF NOT EXISTS ${TABLES.USERS} (
    id int AUTO_INCREMENT,
    lastName varchar(255),
    firstName varchar(255),
    photoId int,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS ${TABLES.AUTH} (
    id int AUTO_INCREMENT,
    email varchar(255) NOT NULL UNIQUE,
    password varchar(255) NOT NULL,
    verified int DEFAULT 0,
    refreshToken varchar(500) UNIQUE,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS ${TABLES.FRIENDS} (
    myId int,
    friendId int,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ${TABLES.WALLS} (
    id int AUTO_INCREMENT,
    ownerId int,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id),
    CONSTRAINT FK_WallOwnerId FOREIGN KEY (ownerId) REFERENCES ${TABLES.USERS} (id)
); 

CREATE TABLE IF NOT EXISTS ${TABLES.POSTS} (
    id int AUTO_INCREMENT,
    ownerId int,
    wallId int,
    description varchar(255),
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id),
    CONSTRAINT FK_PostsOwnerId FOREIGN KEY (ownerId) REFERENCES ${TABLES.USERS} (id),
    CONSTRAINT FK_PostsWallId FOREIGN KEY (wallId) REFERENCES ${TABLES.WALLS} (id)
); 

CREATE TABLE IF NOT EXISTS ${TABLES.COMMENTS} (
    id int AUTO_INCREMENT,
    ownerId int NOT NULL,
    recipientId int NOT NULL,
    entityId int NOT NULL,
    text varchar(500),
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id),
    CONSTRAINT FK_CommentsOwnerId FOREIGN KEY (ownerId) REFERENCES ${TABLES.USERS} (id)
); 

CREATE TABLE IF NOT EXISTS ${TABLES.LIKES} (
    id int AUTO_INCREMENT,
    ownerId int NOT NULL,
    recipientId int NOT NULL,
    entityId int NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id),
    CONSTRAINT FK_LikesOwnerId FOREIGN KEY (ownerId) REFERENCES ${TABLES.USERS} (id)
); 

CREATE TABLE IF NOT EXISTS ${TABLES.PHOTOS} (
    id int AUTO_INCREMENT,
    url varchar(500) NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS ${TABLES.POSTS_PHOTOS} (
    postId int,
    photoId int,
    CONSTRAINT FK_PostsPhotosPostId FOREIGN KEY (postId) REFERENCES ${TABLES.POSTS} (id),
    CONSTRAINT FK_PostsPhotosPhotoId FOREIGN KEY (photoId) REFERENCES ${TABLES.PHOTOS} (id)
); 

`




];