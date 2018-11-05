const database = require('../../DB').connect();


class Like {
    createLike(params) {
        let sql = `INSERT INTO Likes (createdAt) VALUE (DEFAULT);`;
        return database.query(sql);
    }
    isExistPostLike (params) {
        let sql = `
        SELECT * FROM Likes
	    inner join UsersLikes 
        on UsersLikes.likeId = Likes.id 
        and UsersLikes.userId = ?
        inner join PostsLikes 
        on Likes.id = PostsLikes.likeId
        and PostsLikes.postId = ?`;
        return database.query(sql, [params.userId, params.postId]);
    }
    isExistCommentLike(params) {
        let sql = `
        SELECT * FROM Likes
	    inner join UsersLikes 
        on UsersLikes.likeId = Likes.id 
        and UsersLikes.userId = ?
        inner join CommentsLikes 
        on Likes.id = CommentsLikes.likeId
        and CommentsLikes.commentId = ?`;
        return database.query(sql, [params.userId, params.commentId]);
    }

    attachToComment(params) {
        let sql = `INSERT INTO CommentsLikes (likeId, commentId) VALUES (?, ?); `;
        let placeholder = [params.likeId, params.commentId];
        return database.query(sql, placeholder)
    }

    attachToPost(params) {
        let sql = `INSERT INTO PostsLikes (likeId, postId) VALUES (?, ?); `;
        let placeholder = [params.likeId, params.postId];
        return database.query(sql, placeholder)
    }

    getLike(params) {
        let sql = `SELECT id, createdAt FROM Likes WHERE id = ?;`;
        let placeholder = [params.likeId];
        return database.query(sql, placeholder)
    }

    removeLike (params) {
        let likeId = params.likeId;
        let sql = `DELETE FROM Likes WHERE id=?;`;
        return database.query(sql, [likeId])
    }

    saveUserWhoLike (params) {
        let sql = `INSERT INTO UsersLikes (likeId, userId) VALUES (?, ?); `;
        let placeholder = [params.likeId, params.userId];
        return database.query(sql, placeholder)
    }
}


module.exports = new Like;