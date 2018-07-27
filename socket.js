const tokenService = require('./server/utils/token');
const PORT = 8888;
const io = require('socket.io')(PORT);


class ActiveUser {
    constructor ({id, socket, io}) {
        this.id = id;
        this.name = `user-${id}`;
        this.io = io;
        this.socket = socket;

        socket.join(this.name);
        this.setOnline(id);
    }

    static create (data) {
        return new ActiveUser(data);
    }

    sendMessage (msg) {

    }

    readConversation () {

    }

    setOnline (id) {

    }

    setOffline () {

    }

    destroy () {
        this.setOffline();

        this.socket = null;
        this.io = null;
    }
}

let auth = function (socket, next) {
    let {query} = socket.handshake;
    let token;

    socket.auth = false;

    if (!query) {
        socket.disconnect('unauthorized');
        return next(new Error('Authentication error'));
    }

    token = socket.handshake.query.accessToken;

    let {payload, err} = tokenService.decryptToken(token);

    if (err) {
        socket.disconnect('unauthorized');
        return next(new Error('Authentication error'));
    }

    socket.userId = payload.id;
    socket.auth = true;
    next();
};


let chat = io
    .of('/chat')
    .use(auth)
    .on('connection', (socket) => {
        let user = ActiveUser.create({
            id: socket.userId,
            io,
            socket
        });
        
  
        console.log('user connected', user.name);
        
        socket.on('send-message', function (msg) {
            user.sendMessage(msg);
            console.log('message: ' + msg, 'from ' + userId);
            socket.broadcast.emit('send-message', msg);
            chat.emit('send-message', msg)
        });
        
        socket.on('disconnect', function () {
            user.destroy();
            user = null;
        });

    });
