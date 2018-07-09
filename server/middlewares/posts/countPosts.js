const {
    TABLES,
    LIMIT
} = require('../../const');
const {
    POSTS
} = TABLES;
let database = require('../../../DB');
let AppError = require('../../errors');

module.exports = function (req, res, next) {
    let sql = `SELECT count(*) AS countPosts FROM ${POSTS};`;

    database.query(sql)
        .then(([rows]) => {
            res.ans.merge({
                pagination: {
                    total: rows[0].countPosts
                }
            });
            next();
        })
        .catch((e) => {
            next(AppError.create(e));
        })
};

