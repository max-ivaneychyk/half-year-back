const database = require('../../DB').connect();

class Comments {

    createComment (params) {
        let sql = 'INSERT INTO Comments (text) VALUES (?)';

        return database.query(sql, [params.text])
    }

    deleteComment (params) {
        let sql = 'DELETE FROM Comments WHERE id=?;';
        return database.query(sql, [params.commentId])
    }

    addCommentToPost (params) {
        let sql = 'INSERT INTO PostsComments (postId, commentId) VALUES (?, ?)';

        return database.query(sql, [params.postId, params.commentId])
    }

    saveUserWhoAddComment (params) {
        let sql = 'INSERT INTO UsersComments (userId, commentId) VALUES (?, ?)';

        return database.query(sql, [params.userId, params.commentId])
    } 

    getListCommentsToPost (params, pagination = {}) {
        let limit = pagination.limit || 10;
        let offset = pagination.offset || 0;
        let sql = `
        SELECT 
        Comments.id, Comments.text, Comments.updatedAt, Comments.updatedAt,
        (SELECT count(*) FROM CommentsLikes WHERE CommentsLikes.commentId = Comments.id) AS 'countLikes',
          Users.firstName AS 'owner.firstName', Users.lastName AS 'owner.lastName',  Users.id AS 'owner.id',
        
            (SELECT Photos.url
                FROM Photos, Avatars
                WHERE Users.id=Avatars.ownerId AND Photos.id=Avatars.photoId
                ORDER BY Avatars.createdAt DESC
                LIMIT 1
            ) AS 'owner.avatarUrl'
            
        FROM Comments
        inner JOIN PostsComments ON PostsComments.postId = ? and PostsComments.commentId = Comments.id
        inner JOIN UsersComments ON Comments.id = UsersComments.commentId
        inner JOIN Users ON UsersComments.userId = Users.id
        LIMIT ?, ?;`

        return database.query(sql, [params.postId, offset, limit])
    }

    getCommentById (params) {
        let sql = `SELECT  
        Comments.id, Comments.text, Comments.updatedAt, Comments.updatedAt,
        (SELECT count(*) FROM CommentsLikes WHERE CommentsLikes.commentId = Comments.id) AS 'countLikes',
        Users.firstName AS 'owner.firstName', Users.lastName AS 'owner.lastName',  Users.id AS 'owner.id',
    
        (SELECT Photos.url
            FROM Photos, Avatars
            WHERE Users.id=Avatars.ownerId AND Photos.id=Avatars.photoId
            ORDER BY Avatars.createdAt DESC
            LIMIT 1
        ) AS 'owner.avatarUrl'
    
        FROM  Comments
    
        inner JOIN UsersComments ON Comments.id = UsersComments.commentId
        inner JOIN Users ON UsersComments.userId = Users.id
        WHERE Comments.id = ?;`;

        return database.query(sql, [params.commentId])
    }
}

module.exports = new Comments;