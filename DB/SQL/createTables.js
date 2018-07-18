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
    CONSTRAINT FK_WallOwnerId 
        FOREIGN KEY (ownerId) 
        REFERENCES ${TABLES.USERS} (id)
); 

CREATE TABLE IF NOT EXISTS ${TABLES.POSTS} (
    id int AUTO_INCREMENT,
    ownerId int,
    wallId int,
    description varchar(255),
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id),
    CONSTRAINT FK_PostsOwnerId 
        FOREIGN KEY (ownerId) 
        REFERENCES ${TABLES.USERS} (id),
    CONSTRAINT FK_PostsWallId 
        FOREIGN KEY (wallId) 
        REFERENCES ${TABLES.WALLS} (id)
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
    CONSTRAINT FK_CommentsOwnerId 
        FOREIGN KEY (ownerId) 
        REFERENCES ${TABLES.USERS} (id)
); 

CREATE TABLE IF NOT EXISTS ${TABLES.LIKES} (
    id int AUTO_INCREMENT,
    ownerId int NOT NULL,
    recipientId int NOT NULL,
    entityId int NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id),
    CONSTRAINT FK_LikesOwnerId 
        FOREIGN KEY (ownerId) 
        REFERENCES ${TABLES.USERS} (id)
); 

CREATE TABLE IF NOT EXISTS ${TABLES.PHOTOS} (
    id int AUTO_INCREMENT,
    url varchar(500) NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS ${TABLES.AVATARS} (
    ownerId int,
    photoId int,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT FK_AvatarsOwnerId 
        FOREIGN KEY (ownerId) 
        REFERENCES ${TABLES.USERS} (id) 
        ON DELETE CASCADE,
    CONSTRAINT FK_AvatarsPhotoId 
        FOREIGN KEY (photoId) 
        REFERENCES ${TABLES.PHOTOS} (id)
        ON DELETE CASCADE 
);

CREATE TABLE IF NOT EXISTS ${TABLES.POSTS_PHOTOS} (
    postId int,
    photoId int,
    CONSTRAINT FK_PostsPhotosPostId 
        FOREIGN KEY (postId) 
        REFERENCES ${TABLES.POSTS} (id) 
        ON DELETE CASCADE,
    CONSTRAINT FK_PostsPhotosPhotoId 
        FOREIGN KEY (photoId) 
        REFERENCES ${TABLES.PHOTOS} (id)
        ON DELETE CASCADE 
); 

CREATE TABLE IF NOT EXISTS ${TABLES.POSTS_COMMENTS} (
    postId int,
    commentId int,
    CONSTRAINT FK_PostCommentsPostId 
        FOREIGN KEY (postId) 
        REFERENCES ${TABLES.POSTS} (id) 
        ON DELETE CASCADE,
    CONSTRAINT FK_PostsCommentsCommentId 
        FOREIGN KEY (commentId) 
        REFERENCES ${TABLES.COMMENTS} (id)
        ON DELETE CASCADE 
); 

`

];