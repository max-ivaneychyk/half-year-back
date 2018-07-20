const middlewares = require('../middlewares');
const Validator = require('../validators/Validator');
const {photosUploader} = require('../utils/multer');
let {UserRegistrationModel, UserLoginModel} = require('../models/index');

class UserController {
    constructor () {
        this.signUp = [
            Validator.create(UserRegistrationModel),
            Validator.isSameFields(['password', 'repeatPassword']),
            Validator.deleteFields(['repeatPassword']),
            middlewares.user.addNewUser,
            middlewares.email.sendVerifyEmail,
            middlewares.sendAnswer
        ];

        this.signIn = [
            Validator.create(UserLoginModel),
            middlewares.user.signInUser,
            middlewares.utils.groupJoinData,
            middlewares.token.addAuthToken,
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
            middlewares.user.getUserProfileById,
            middlewares.utils.groupJoinData,
            middlewares.sendAnswer
        ];
    }
}


module.exports = new UserController;