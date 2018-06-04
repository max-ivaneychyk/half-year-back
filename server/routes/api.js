const controllers = require('../controllers');
const express = require('express');
const router = express.Router();

router.route('/users')
    .post(controllers.usersController.addNewUser);

module.exports = router;
