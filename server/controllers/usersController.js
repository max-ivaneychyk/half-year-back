const middlewares = require('../middlewares');
const Validator = require('../validators/Validator');
const {photosUploader} = require('../utils/multer');
const entities = require('../entities');
let {UserRegistrationModel, UserLoginModel, UserResetPasswordModel} = require('../models/index');
let errorMessages = require('../errors/errorMessages');
let tokenController = require('./tokenController');
let Controller = require('./Controller');

class UserController extends Controller {
    constructor() {
        super();

        this.signUp = [
            Validator.create(UserRegistrationModel).body,
            Validator.isSameFields(['password', 'repeatPassword']),
            Validator.deleteFields(['repeatPassword']),
            this._registerNewUser,
            middlewares.email.sendVerifyEmail,
            this.sendAnswer
        ];

        this.resetPassword = [
            Validator.create(UserResetPasswordModel).body,
            Validator.isSameFields(['password', 'repeatPassword']),
            Validator.deleteFields(['repeatPassword']),
            this._resetPassword,
            middlewares.email.resetPasswordEmail,
            this.sendAnswer
        ];

        this.signIn = [
            Validator.create(UserLoginModel).body,
            this._signIn,
            this.mapRecords([this.JOIN_OBJECTS.WALLS]),
            tokenController.putSession,
            this.sendAnswer
        ];

        this.searchUsers = [
            this.checkToken,
            this.addUserIdToParams,
            this._searchUsers,
            this.sendAnswer
        ];

        this.changeAvatar = [
            this.checkToken,
            photosUploader.array('avatar', 1),
            this.addUserIdToParams,
            this.uploadOnePhoto,
            this._updateAvatarId,
            this.sendAnswer
        ];

        this.updateStatus = [
            this.checkToken,
            this.addUserIdToParams,
            this._updateStatus,
            this.sendAnswer
        ];

        this.getUserById = [
            this.checkToken,
            this._getUserById,
            this.mapRecords([this.JOIN_OBJECTS.WALLS]),
            this.getFirstElemFromDataList,
            this.sendAnswer
        ];

        this.userFullInfoById = [
            this.checkToken,
            this._getUserFullInfoById,
            this.mapRecords([this.JOIN_OBJECTS.WALLS]),
            this.getFirstElemFromDataList,
            this.sendAnswer
        ];

        this.setAdditionalInfo = [
            this.checkToken,
            this.addUserIdToParams,
            this._setAdditionalInfo,
            ...this.userFullInfoById
        ];
    }

    _signIn(req, res, next) {
        entities.user.signIn(req.body).then(([rows]) => {
            let data = rows[0];

            console.log(data);

            if (!data) {
                return next(errorMessages.USER_NOT_FOUNT)
            }

            if (!data.verified) {
                return next(errorMessages.USER_NOT_VERIFIED)
            }

            req.ans.merge({data});
            req.params.userId = data.id;

            next()
        }).catch(next);
    }

    _getUserById(req, res, next) {
        entities.user.getUserProfileById(req.params).then(([rows]) => {
            let data = rows;

            req.ans.merge({data});

            next()
        }).catch(next);
    }

    _getUserFullInfoById(req, res, next) {
        entities.user.getUserFullProfileById(req.params).then(([rows]) => {
            let data = rows;

            req.ans.merge({data});

            next()
        }).catch(next);
    }

    _updateStatus(req, res, next) {
        entities.user.updateTextStatus({status: req.body.status, userId: req.params.userId})
            .then(() => {
                next()
            })
            .catch(next);
    }

    _setAdditionalInfo(req, res, next) {
        entities.user.setAdditionalInfo({...req.body, userId: req.params.userId})
            .then(() => {
                next()
            })
            .catch(next);
    }

    _registerNewUser(req, res, next) {
        entities.user.registerNewUser(req.body)
            .then(token => {
                req.body.token = token;
                next()
            })
            .catch(next);
    }

    _resetPassword(req, res, next) {
        entities.user.resetPassword(req.body)
            .then(token => {
                req.body.token = token;
                next()
            })
            .catch(next);
    }

    _searchUsers(req, res, next) {
        entities.user.searchUsers({userId: req.params.userId})
            .then(([rows]) => {
                req.ans.merge({data: rows});
                next()
            })
            .catch(next);
    }

    _updateAvatarId(req, res, next) {
        entities.user.saveAvatarId({userId: req.params.userId, avatarId: req.ans.get().data.id})
            .then(() => {
                next();
            })
            .catch(next)
    }
}


module.exports = new UserController;