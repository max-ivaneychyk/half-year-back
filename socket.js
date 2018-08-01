const tokenService = require('./server/utils/token');
const PORT = 8888;
const NAMESPACE_CHAT = '/chat';
const io = require('socket.io')(PORT);
const database = require('./DB').connect();
const friendsEntities = require('./server/entities').friends;

const IS_ONLINE = 1;
const IS_OFFLINE = 0;

const SOCKET_EVENTS = {
    MESSAGE: 'message',
    ONLINE: 'online'
};

class ActiveUser {
    constructor({
        id,
        socket,
        io
    }) {
        this.id = id;
        this.name = `user:${id}`;
        this.io = io;
        this.socket = socket;

        socket.join(this.name);

        console.log('user connected', this.name);

        socket.on(SOCKET_EVENTS.MESSAGE,  (msg) => {
            this.sendMessage(msg);
            console.log('message: ' + msg);
            socket.broadcast.emit('send-message', msg);
            io.emit('send-message', msg)
        });

        socket.on(SOCKET_EVENTS.ONLINE,  (msg) => {
            console.log('online: ' + msg);
        });

        this.setOnline(id);
    }


    static create(data) {
        return new ActiveUser(data);
    }


    sendMessage(msg) {}

    readConversation(conversationId) {}

    setOnline(id) {
        return this._updateStatusOnline(id, IS_ONLINE).then(() => {
            return this._informFriendsAboutMe(id, IS_ONLINE);
        });
    }

    setOffline(id) {
        return this._updateStatusOnline(id, IS_OFFLINE).then(() => {
            return this._informFriendsAboutMe(id, IS_OFFLINE);
        });
    }

    _informFriendsAboutMe(myId, isOnline) {
        let payload = {
            data: {
                userId: myId,
                isOnline
            }
        };

        return this._getListOnlineFriends(myId).then(([friends]) => {
            friends.forEach(friend => {
                let userName = `user:${friend.id}`;

                this.io.of(NAMESPACE_CHAT).to(userName).emit(SOCKET_EVENTS.ONLINE, payload);
            });
        })
    }
    _getListOnlineFriends(myId) {
        return friendsEntities.getListOnlineFriends({
            userId: myId
        });
    }

    _updateStatusOnline(userId, isOnline) {
        let sql = `UPDATE Online SET isOnline=? WHERE userId=?;`;
        return database.query(sql, [isOnline, userId]);
    }

    destroy() {
        this.setOffline(this.id).then(() => {
            this.socket = null;
            this.io = null;           
        }).catch(err => {
            this.socket = null;
            this.io = null;    
        });
    }
}

let auth = function (socket, next) {
    let {
        query
    } = socket.handshake;
    let token;

    socket.auth = false;

    if (!query) {
        socket.disconnect('unauthorized');
        return next(new Error('Authentication error'));
    }

    token = socket.handshake.query.accessToken;

    let {
        payload,
        err
    } = tokenService.decryptToken(token);

    if (err) {
        socket.disconnect('unauthorized');
        return next(new Error('Authentication error'));
    }

    socket.userId = payload.id;
    socket.auth = true;
    next();
};


io.of(NAMESPACE_CHAT).use(auth)
    .on('connection', (socket) => {
        let user = ActiveUser.create({
            id: socket.userId,
            io,
            socket
        });

        console.log('Connected', user.name)

        socket.on('disconnect', function () {
            user.destroy();
            user = null;
        });

    });