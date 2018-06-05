let {frontend} = require('../../config/');

module.exports = function (req, res) {
    res.redirect(frontend.FULL_PATH);
};