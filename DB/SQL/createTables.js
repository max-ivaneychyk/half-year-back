let TABLES = require('../const/tables').TABLES;

module.exports = [

`CREATE TABLE IF NOT EXISTS ${TABLES.USERS} (
    id int AUTO_INCREMENT,
    lastName varchar(255),
    firstName varchar(255),
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
    updatedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS ${TABLES.WALLS} (
    id int AUTO_INCREMENT,
    title varchar(255),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
); 

CREATE TABLE IF NOT EXISTS ${TABLES.POSTS} (
    id int AUTO_INCREMENT,
    description varchar(255),
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
); 

CREATE TABLE IF NOT EXISTS ${TABLES.COMMENTS} (
    id int AUTO_INCREMENT,
    text varchar(500),
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
); 

CREATE TABLE IF NOT EXISTS ${TABLES.LIKES} (
    id int AUTO_INCREMENT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
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

CREATE TABLE IF NOT EXISTS ${TABLES.POSTS_LIKES} (
    postId int,
    likeId int,
    CONSTRAINT FK_PostLikesPostId 
        FOREIGN KEY (postId) 
        REFERENCES ${TABLES.POSTS} (id) 
        ON DELETE CASCADE,
    CONSTRAINT FK_PostsLikesLikeId 
        FOREIGN KEY (likeId) 
        REFERENCES ${TABLES.LIKES} (id)
        ON DELETE CASCADE 
); 

CREATE TABLE IF NOT EXISTS ${TABLES.COMMENTS_LIKES} (
    commentId int,
    likeId int,
    CONSTRAINT FK_CommentsLikesCommentId 
        FOREIGN KEY (commentId) 
        REFERENCES ${TABLES.COMMENTS} (id) 
        ON DELETE CASCADE,
    CONSTRAINT FK_CommentsLikesLikeId 
        FOREIGN KEY (likeId) 
        REFERENCES ${TABLES.LIKES} (id)
        ON DELETE CASCADE 
); 

CREATE TABLE IF NOT EXISTS ${TABLES.USERS_WALLS} (
    userId int,
    wallId int,
    CONSTRAINT FK_UsersWallsUserId 
        FOREIGN KEY (userId) 
        REFERENCES ${TABLES.USERS} (id) 
        ON DELETE CASCADE,
    CONSTRAINT FK_UsersWallsWallId 
        FOREIGN KEY (wallId) 
        REFERENCES ${TABLES.WALLS} (id)
        ON DELETE CASCADE 
); 

CREATE TABLE IF NOT EXISTS ${TABLES.USERS_LIKES} (
    userId int,
    likeId int,
    CONSTRAINT FK_UsersLikesUserId 
        FOREIGN KEY (userId) 
        REFERENCES ${TABLES.USERS} (id) 
        ON DELETE CASCADE,
    CONSTRAINT FK_UsersLikesLikeId 
        FOREIGN KEY (likeId) 
        REFERENCES ${TABLES.LIKES} (id)
        ON DELETE CASCADE 
); 

CREATE TABLE IF NOT EXISTS ${TABLES.WALLS_POSTS} (
    postId int,
    wallId int,
    CONSTRAINT FK_WallsPostsPostId 
        FOREIGN KEY (postId) 
        REFERENCES ${TABLES.POSTS} (id) 
        ON DELETE CASCADE,
    CONSTRAINT FK_WallsPostsWallId 
        FOREIGN KEY (wallId) 
        REFERENCES ${TABLES.WALLS} (id)
        ON DELETE CASCADE 
); 

CREATE TABLE IF NOT EXISTS ${TABLES.USERS_POSTS} (
    postId int,
    userId int,
    CONSTRAINT FK_UsersPostsPostId 
        FOREIGN KEY (postId) 
        REFERENCES ${TABLES.POSTS} (id) 
        ON DELETE CASCADE,
    CONSTRAINT FK_UsersPostsUserId 
        FOREIGN KEY (userId) 
        REFERENCES ${TABLES.USERS} (id)
        ON DELETE CASCADE 
); 

CREATE TABLE IF NOT EXISTS ${TABLES.USERS_COMMENTS} (
    commentId int,
    userId int,
    CONSTRAINT FK_UsersCommentsCommentId 
        FOREIGN KEY (commentId) 
        REFERENCES ${TABLES.COMMENTS} (id) 
        ON DELETE CASCADE,
    CONSTRAINT FK_UsersCommentsUserId 
        FOREIGN KEY (userId) 
        REFERENCES ${TABLES.USERS} (id)
        ON DELETE CASCADE 
); 

`

];