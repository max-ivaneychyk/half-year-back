module.exports = function (req, res, next) {
   req.query.limit = req.query.limit || 10;
   req.query.offset = req.query.offset || 0;

   next();
};