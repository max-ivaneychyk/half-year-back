const {IS_ONLINE, IS_OFFLINE} = require('../const');
let friendsEntities = require('../entities').friends;
let userEntity = require('../entities').user;


const SOCKET_EVENTS = {
    MESSAGE: 'message',
    ONLINE: 'online'
};

const NAMESPACES = {
    CHAT: '/chat'
};

class ChatUser {
    constructor(params) {
        let {id, socket, io} = params;

        this.id = id;
        this.name = `user:${id}`;
        this.io = io;
        this.socket = socket;

        socket.join(this.name);

        console.log('user connected', this.name);

        socket.on(SOCKET_EVENTS.MESSAGE, (msg) => {
            this.sendMessage(msg);
            console.log('message: ' + msg);
            socket.broadcast.emit('send-message', msg);
            io.emit('send-message', msg)
        });

        socket.on(SOCKET_EVENTS.ONLINE, (msg) => {
            console.log('online: ' + msg);
        });

        this.setOnline(id);
    }


    static create(data) {
        return new ChatUser(data);
    }


    sendMessage(msg) {
    }

    readConversation(conversationId) {
    }

    setOnline(userId) {
        return userEntity.updateStatusOnline({userId, isOnline: IS_ONLINE}).then(() => {
            return this._informFriendsAboutMe(id, IS_ONLINE);
        });
    }

    setOffline(id) {
        return userEntity.updateStatusOnline({userId: id, isOnline: IS_OFFLINE}).then(() => {
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

                this.io.of(NAMESPACES.CHAT).to(userName).emit(SOCKET_EVENTS.ONLINE, payload);
            });
        })
    }

    _getListOnlineFriends(myId) {
        return friendsEntities.getListOnlineFriends({
            userId: myId
        });
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

module.exports = {
    ChatUser,
    SOCKET_EVENTS,
    NAMESPACES
};