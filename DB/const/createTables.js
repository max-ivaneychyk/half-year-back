let TABLES = require('./tables').TABLES;

module.exports = [

`CREATE TABLE IF NOT EXISTS ${TABLES.USERS} (
    id int AUTO_INCREMENT,
    lastName varchar(255),
    firstName varchar(255),
    status varchar(60),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS UsersInfo (
    userId int,
    dateOfBirth varchar(255),
    gender int,
    about varchar(1000),
    phone char(13),
    email varchar(40),
    hometown varchar(60),
    cityOfResidence varchar(60),

    PRIMARY KEY(userId),
    CONSTRAINT FK_UsersInfoUserId 
        FOREIGN KEY (userId) 
        REFERENCES Users (id) 
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ${TABLES.ONLINE} (
    userId int,
    isOnline int,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP 
        ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(userId),
    CONSTRAINT FK_OnlineUserId 
        FOREIGN KEY (userId) 
        REFERENCES ${TABLES.USERS} (id) 
        ON DELETE CASCADE
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
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(myId, friendId),
    CONSTRAINT FK_FriendsMyId 
        FOREIGN KEY (myId) 
        REFERENCES ${TABLES.USERS} (id) 
        ON DELETE NO ACTION,
    CONSTRAINT FK_FriendsFriendId 
        FOREIGN KEY (friendId) 
        REFERENCES ${TABLES.USERS} (id) 
        ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS ${TABLES.WALLS} (
    id int AUTO_INCREMENT,
    title varchar(255),
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
); 

CREATE TABLE IF NOT EXISTS ${TABLES.POSTS} (
    id int AUTO_INCREMENT,
    description text(20000),
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

CREATE TABLE IF NOT EXISTS ${TABLES.MESSAGES} (
    id int AUTO_INCREMENT,
    message varchar(500),
    uuid varchar(500),
    status int DEFAULT 0,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
); 

CREATE TABLE IF NOT EXISTS ${TABLES.CONVERSATIONS} (
    id int AUTO_INCREMENT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
); 

CREATE TABLE IF NOT EXISTS ${TABLES.CONVERSATIONS_MESSAGES} (
    messageId int NOT NULL,
    conversationId int NOT NULL,
    PRIMARY KEY(messageId, conversationId),
    CONSTRAINT FK_ConversationMessagesMessageId 
        FOREIGN KEY (messageId) 
        REFERENCES ${TABLES.MESSAGES} (id) 
        ON DELETE CASCADE,
    CONSTRAINT FK_ConversationMessagesConversationId 
        FOREIGN KEY (conversationId) 
        REFERENCES ${TABLES.CONVERSATIONS} (id)
        ON DELETE CASCADE  
); 

CREATE TABLE IF NOT EXISTS ${TABLES.USERS_MESSAGES} (
    messageId int NOT NULL,
    userId int NOT NULL,
    PRIMARY KEY(messageId, userId),
    CONSTRAINT FK_UsersMessagesMessageId 
        FOREIGN KEY (messageId) 
        REFERENCES ${TABLES.MESSAGES} (id) 
        ON DELETE CASCADE,
    CONSTRAINT FK_UsersMessagesUserId 
        FOREIGN KEY (userId) 
        REFERENCES ${TABLES.USERS} (id)
        ON DELETE CASCADE
); 

CREATE TABLE IF NOT EXISTS ${TABLES.USERS_CONVERSATIONS} (
    conversationId int NOT NULL,
    userId int NOT NULL,
    PRIMARY KEY(userId, conversationId),
    CONSTRAINT FK_UsersConversationsConversationId 
        FOREIGN KEY (conversationId) 
        REFERENCES ${TABLES.CONVERSATIONS} (id) 
        ON DELETE CASCADE,
    CONSTRAINT FK_UsersConversationsUserId 
        FOREIGN KEY (userId) 
        REFERENCES ${TABLES.USERS} (id)
        ON DELETE CASCADE
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
    PRIMARY KEY (postId, commentId),
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
    PRIMARY KEY (postId, likeId),
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
    PRIMARY KEY (commentId, likeId),
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
    PRIMARY KEY (userId, wallId),
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
    PRIMARY KEY (userId, likeId),
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