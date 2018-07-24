const {
    TABLES,
    LIMIT
} = require('../../const');
const {
    POSTS, WALLS_POSTS
} = TABLES;
let database = require('../../../DB');
let AppError = require('../../errors');

module.exports = function (req, res, next) {
    let limit = req.query.limit || LIMIT.POSTS;
    let offset = req.query.offset || 0;

    let page = offset/limit;
    let {wallId} = req.params;
    let sql = `
    SELECT count(*) AS countPosts 
    FROM ${POSTS}
    INNER JOIN ${WALLS_POSTS} ON ${WALLS_POSTS}.wallId = ? AND ${WALLS_POSTS}.postId = ${POSTS}.id;
    `;

    database.query(sql, [wallId])
        .then(([rows]) => {
            let total = rows[0].countPosts;

            res.ans.merge({
                pagination: {
                    nextOffset: (page+1) * limit,
                    nextPage: page + 1,
                    total
                }
            });

            next();
        })
        .catch((e) => {
            next(AppError.create(e));
        })
};

