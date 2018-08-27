const tokenService = require('./server/utils/token');
const {ChatUser, NAMESPACES} = require('./server/socket/ChatUser');
const PORT = 8888;
const io = require('socket.io')(PORT);


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


io.of(NAMESPACES.CHAT)
    .use(auth)
    .on('connection', (socket) => {
        let user = ChatUser.create({
            id: socket.userId,
            io,
            socket
        });

        socket.on('disconnect', function () {
            user.destroy();
            user = null;
        });

    });