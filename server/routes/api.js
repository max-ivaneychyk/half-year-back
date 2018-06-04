const controllers = require('../controllers');
const express = require('express');
const router = express.Router();

router.route('/users').post(controllers.usersController.signUp);

router.route('/users/login').post(controllers.usersController.signIn);

router.route('/verify-email/:token')
    .get(controllers.verifyEmailController.verify);

module.exports = router;

