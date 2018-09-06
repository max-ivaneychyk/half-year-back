const middlewares = require('../middlewares');
const Validator = require('../validators/Validator');
const {photosUploader} = require('../utils/multer');
const entities = require('../entities');
let {UserRegistrationModel, UserLoginModel} = require('../models/index');
let errorMessages = require('../errors/errorMessages');
let tokenController = require('./tokenController');
let Controller = require('./Controller');

class UserController extends Controller {
    constructor () {
        super();

        this.signUp = [
            Validator.create(UserRegistrationModel).body,
            Validator.isSameFields(['password', 'repeatPassword']),
            Validator.deleteFields(['repeatPassword']),
            middlewares.user.addNewUser,
            middlewares.email.sendVerifyEmail,
            this.sendAnswer
        ];

        this.signIn = [
            Validator.create(UserLoginModel).body,
            this._signIn,
            this.mapRecors([this.JOIN_OBJECTS.WALLS]),
            tokenController.putSession,
            this.sendAnswer
        ];

        this.searchUsers = [
            this.checkToken,
            middlewares.user.searchUsers,
            this.sendAnswer
        ];

        this.changeAvatar = [
            this.checkToken,
            photosUploader.array('avatar', 1),
            middlewares.photos.uploadPhoto,
            middlewares.user.saveAvatarId,
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
            this.mapRecors([this.JOIN_OBJECTS.WALLS]),
            this.getFirstElemFromDataList,
            this.sendAnswer
        ];

        this.userFullInfoById = [
            this.checkToken,
            this._getUserFullInfoById,
            this.mapRecors([this.JOIN_OBJECTS.WALLS]),
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

    _signIn (req, res, next) {
        entities.user.signIn(req.body).then(([rows]) => {
            let data = rows[0];
    
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

    _getUserById (req, res, next) {
        entities.user.getUserProfileById(req.params).then(([rows]) => {
            let data = rows;

            req.ans.merge({data});
   
            next()
        }).catch(next);
    }

    _getUserFullInfoById (req, res, next) {
        entities.user.getUserFullProfileById(req.params).then(([rows]) => {
            let data = rows;

            req.ans.merge({data});
   
            next()
        }).catch(next);
    }

    _updateStatus (req, res, next) {
        entities.user.updateTextStatus({status: req.body.status, userId: req.params.userId})
        .then(() => {
           next()
        })
        .catch(next);
    }

    _setAdditionalInfo (req, res, next) {
        entities.user.setAdditionalInfo({...req.body, userId: req.params.userId})
        .then(() => {
           next()
        })
        .catch(next);
    }
}


module.exports = new UserController;