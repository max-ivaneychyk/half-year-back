let {TABLES, ENTITIES} = require('../../const');
let database = require('../../../DB');
let errorMessages = require('../../errors/errorMessages');
let AppError = require('../../errors');

module.exports = function (req, res, next) {
    let sql = `INSERT INTO ${TABLES.LIKES} (createdAt) VALUE (DEFAULT);`;

    database.query(sql).then(([rows]) => {
        req.params.likeId = rows.insertId;
        next();
    }).catch(e => {
        let err = AppError.create(e);
        next(err);
    })
};

