const middlewares = require('../middlewares');
const entities = require('../entities');
let {groupJoinData, CHECK_KEYS} = middlewares.utils.joiner;

class Controller {
    constructor() {
        this.JOIN_OBJECTS = CHECK_KEYS;
    }
    
    checkToken (req, res, next) {
        middlewares.token.checkToken(req, res, next)
    }

    sendAnswer (req, res, next) {
        middlewares.sendAnswer(req, res, next)
    }

    addUserIdToParams (req, res, next) {
        middlewares.utils.addUserIdToParams.apply(null, arguments);
    }

    mapRecords(listForJoin = []) {
        return groupJoinData(listForJoin)
    }

    getFirstElemFromDataList (req, res, next) {
        req.ans.merge({data: req.ans.get().data[0]});
        next();
    }

    uploadOnePhoto(req, res, next) {
        entities.photo.uploadOnePhoto(req)
            .then(data => {
                req.ans.set({data});
                next();
            })
            .catch(next)
    }
}

module.exports = Controller;