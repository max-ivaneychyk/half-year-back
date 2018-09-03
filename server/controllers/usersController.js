const middlewares = require('../middlewares');
const Validator = require('../validators/Validator');
const {photosUploader} = require('../utils/multer');
const entities = require('../entities');
let {UserRegistrationModel, UserLoginModel} = require('../models/index');
let {groupJoinData, CHECK_KEYS, getFirstFromList} = middlewares.utils.joiner;
let errorMessages = require('../errors/errorMessages');
let tokenController = require('./tokenController');

class UserController {
    constructor () {
        this.signUp = [
            Validator.create(UserRegistrationModel).body,
            Validator.isSameFields(['password', 'repeatPassword']),
            Validator.deleteFields(['repeatPassword']),
            middlewares.user.addNewUser,
            middlewares.email.sendVerifyEmail,
            middlewares.sendAnswer
        ];

        this.signIn = [
            Validator.create(UserLoginModel).body,
            this._signIn,
            groupJoinData([CHECK_KEYS.WALLS]),
            tokenController.putSession,
            middlewares.sendAnswer
        ];

        this.searchUsers = [
            middlewares.token.checkToken,
            middlewares.user.searchUsers,
            middlewares.sendAnswer
        ];

        this.changeAvatar = [
            middlewares.token.checkToken,
            photosUploader.array('avatar', 1),
            middlewares.photos.uploadPhoto,
            middlewares.user.saveAvatarId,
            middlewares.sendAnswer
        ];

        this.getUserById = [
            middlewares.token.checkToken,
            this._getUserById,
            groupJoinData([CHECK_KEYS.WALLS]),
            getFirstFromList,
            middlewares.sendAnswer
        ];

        this.test = [
            middlewares.sendAnswer
        ]
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
}


module.exports = new UserController;