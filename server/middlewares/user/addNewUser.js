let constants = require('../../const/index');
let database = require('../../../DB/index');
let tokenService = require('../../utils/token/index');
let errorMessages = require('../../errors/errorMessages');
let AppError = require('../../errors');
const {TABLES} = constants;

module.exports = function addNewUser(req, res, next) {
    let {firstName, lastName, email, password} = req.body;
    let token = tokenService.generateRefreshToken({email});
    let sqlSecurityInfo = `INSERT INTO ${TABLES.AUTH} (email, password, refreshToken) VALUES (?, ?, ?);`;
    let sqlAddUser = `INSERT INTO ${TABLES.USERS} (firstName, lastName) VALUES (?, ?);`;

    database.query(sqlSecurityInfo, [email, password, token])
        .then(() => database.query(sqlAddUser, [firstName, lastName]))
        .then(() => {
            req.body.token = token;
            next();
        })
        .catch(err => {
            // User Exist
            console.log(err);
            next(AppError.create(errorMessages.USER_EXIST));
        })
};
