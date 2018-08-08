const database = require('../../DB').connect();

class Posts {
    addPhotosToPost (params) {
        let {postId, photos} = params;
        let placeholder = [];
        let sql, values;
    
        if (!photos || !photos.length) {
            return Promise.resolve([]);
        }
    
        photos.forEach(photoId => placeholder.push(postId, photoId));
        values = Array(photos.length).fill('(?, ?)').join(', ');
        sql = `INSERT INTO PostsPhotos (postId, photoId) VALUES ${values}; `;
    
        return database.query(sql, placeholder);
    }

    addNewPost (params) {
        let sql = `INSERT INTO Posts (description) VALUES (?); `;
        let placeholder = [params.text];

        return database.query(sql, placeholder);
    }

    addPostToWall (params) {
        let sql = `INSERT INTO WallsPosts (wallId, postId) VALUES (?, ?); `;
        let placeholder = [params.wallId,  params.postId];

        return database.query(sql, placeholder);
    }

    addUserToPost (params) {
        let sql = `INSERT INTO UsersPosts (userId, postId) VALUES (?, ?); `;
        let placeholder = [params.userId, params.postId];

        return database.query(sql, placeholder);
    }

    deletePost (params) {
        let sql = `DELETE FROM Posts WHERE id=?;`;

        return database.query(sql, [params.postId]);
    }

    getPostById (params) {
        let sql = `
        SELECT
        post.id, post.description, post.updatedAt, post.createdAt,
        Photos.id AS 'photos[0].id', Photos.url AS 'photos[0].url',
        Users.id AS 'owner.id', Users.firstName AS 'owner.firstName', Users.lastName AS 'owner.lastName',
        (SELECT count(*) FROM PostsLikes WHERE PostsLikes.postId = post.id) AS countLikes,
        (SELECT count(*) FROM PostsComments WHERE PostsComments.postId = post.id) AS countComments,
        (SELECT UsersLikes.likeId FROM UsersLikes, PostsLikes WHERE  UsersLikes.userId = 1 AND UsersLikes.likeId = PostsLikes.likeId AND PostsLikes.postId = post.id LIMIT 1) AS likeId,
    
        (SELECT count(*) FROM CommentsLikes WHERE CommentsLikes.commentId = Comments.id) AS 'comments[0].countLikes',
        Comments.id AS 'comments[0].id',
        Comments.text AS 'comments[0].text',
        Comments.createdAt AS 'comments[0].createdAt',
        (SELECT UsersLikes.likeId FROM UsersLikes, CommentsLikes WHERE  UsersLikes.userId = 1 AND UsersLikes.likeId = CommentsLikes.likeId AND CommentsLikes.commentId =  Comments.id LIMIT 1) AS  'comments[0].likeId',
    
        OwnerComment.id AS  'comments[0].owner.id',
        OwnerComment.firstName AS  'comments[0].owner.firstName',
        OwnerComment.lastName AS  'comments[0].owner.lastName',
    
        (SELECT Photos.url
            FROM Photos, Avatars
            WHERE Users.id=Avatars.ownerId AND Photos.id=Avatars.photoId
            ORDER BY Avatars.createdAt DESC
            LIMIT 1
        ) AS 'owner.avatarUrl',
        (SELECT Photos.url
            FROM Photos, Avatars
            WHERE OwnerComment.id=Avatars.ownerId AND Photos.id=Avatars.photoId
            ORDER BY Avatars.createdAt DESC
            LIMIT 1
        ) AS 'comments[0].owner.avatarUrl'
    
        FROM (
            SELECT Posts.id, Posts.description, Posts.updatedAt, Posts.createdAt
            FROM Posts
            WHERE Posts.id = ?
            ORDER BY Posts.createdAt DESC
            LIMIT 1
        ) as post
        LEFT JOIN PostsPhotos ON post.id = PostsPhotos.postId
        LEFT JOIN Photos ON PostsPhotos.photoId = Photos.id
        INNER JOIN UsersPosts ON UsersPosts.postId = post.id
        INNER JOIN Users ON UsersPosts.userId = Users.id
    
        LEFT JOIN Comments ON Comments.id = (SELECT Comments.id
            FROM PostsComments, Comments
            WHERE PostsComments.postId=post.id
            AND PostsComments.commentId=Comments.id
            ORDER BY Comments.createdAt DESC
            LIMIT 1
        )
    
        LEFT JOIN UsersComments ON UsersComments.commentId = Comments.id
        LEFT JOIN Users AS OwnerComment ON OwnerComment.id = UsersComments.userId
        ORDER BY post.createdAt DESC`

        return database.query(sql, [params.postId]);
    }

    getPosts (params, pagination) {
        let userID = params.userId;
        let {wallId} = params;
        let limit = pagination.limit || 10;
        let offset = pagination.offset || 0;
        let sql = `
        SELECT
    post.id, post.description, post.updatedAt, post.createdAt,
    Photos.id AS 'photos[0].id', Photos.url AS 'photos[0].url',
    Users.id AS 'owner.id', Users.firstName AS 'owner.firstName', Users.lastName AS 'owner.lastName',
    (SELECT count(*) FROM PostsLikes WHERE PostsLikes.postId= post.id) AS countLikes,
    (SELECT count(*) FROM PostsComments WHERE PostsComments.postId = post.id) AS countComments,
    (SELECT UsersLikes.likeId FROM UsersLikes, PostsLikes WHERE  UsersLikes.userId = ? AND UsersLikes.likeId = PostsLikes.likeId AND PostsLikes.postId = post.id LIMIT 1) AS likeId,

    (SELECT count(*) FROM CommentsLikes WHERE CommentsLikes.commentId = Comments.id) AS 'lastComment.countLikes',
    Comments.id AS 'lastComment.id',
    Comments.text AS 'lastComment.text',
    Comments.createdAt AS 'lastComment.createdAt',
    (SELECT UsersLikes.likeId FROM UsersLikes, CommentsLikes WHERE  UsersLikes.userId = ? AND UsersLikes.likeId = CommentsLikes.likeId AND CommentsLikes.commentId =  Comments.id LIMIT 1) AS  'lastComment.likeId',

    OwnerComment.id AS  'lastComment.owner.id',
    OwnerComment.firstName AS  'lastComment.owner.firstName',
    OwnerComment.lastName AS  'lastComment.owner.lastName',

    (SELECT Photos.url
        FROM Photos, Avatars
        WHERE Users.id=Avatars.ownerId AND Photos.id=Avatars.photoId
        ORDER BY Avatars.createdAt DESC
        LIMIT 1
    ) AS 'owner.avatarUrl',
    (SELECT Photos.url
        FROM Photos, Avatars
        WHERE OwnerComment.id=Avatars.ownerId AND Photos.id=Avatars.photoId
        ORDER BY Avatars.createdAt DESC
        LIMIT 1
    ) AS 'lastComment.owner.avatarUrl'

    FROM (
        SELECT Posts.id, Posts.description, Posts.updatedAt, Posts.createdAt
        FROM Posts, WallsPosts
        WHERE WallsPosts.wallId=? AND WallsPosts.postId=Posts.id
        ORDER BY Posts.createdAt DESC
        LIMIT ?, ?
    ) as post
    LEFT JOIN PostsPhotos ON post.id = PostsPhotos.postId
    LEFT JOIN Photos ON PostsPhotos.photoId = Photos.id
    INNER JOIN UsersPosts ON UsersPosts.postId = post.id
    INNER JOIN Users ON UsersPosts.userId = Users.id

    LEFT JOIN Comments ON Comments.id = (SELECT Comments.id
        FROM PostsComments, Comments
        WHERE PostsComments.postId=post.id
        AND PostsComments.commentId=Comments.id
        ORDER BY Comments.createdAt DESC
        LIMIT 1
    )

    LEFT JOIN UsersComments ON UsersComments.commentId = Comments.id
    LEFT JOIN Users AS OwnerComment ON OwnerComment.id = UsersComments.userId
    ORDER BY post.createdAt DESC
        `;

        let placeholder = [userID, userID, wallId, +offset, +limit];
        return database.query(sql, placeholder);
    }

    addPagination (params) {
        let {wallId} = params;
        let sql = `
        SELECT count(*) AS countPosts 
        FROM Posts
        INNER JOIN WallsPosts 
            ON WallsPosts.wallId = ? 
            AND WallsPosts.postId = Posts.id;
        `;
    
        return database.query(sql, [wallId])
    }

    
}

module.exports = new Posts;
