const tokenService = require('./server/utils/token');
const PORT = 8888;
const io = require('socket.io')(PORT);

io.use(function (socket, next) {
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

});

let chat = io
    .of('/chat')
    .on('connection', (socket) => {
        console.log('user connected');

        socket.use((socket, next) => {
            console.log('middleware work');
            next();
        });

        socket.on('disconnect', function () {
            console.log('user disconnected');
        });

        socket.on('send-message', function (msg) {
            console.log('message: ' + msg);
            socket.broadcast.emit('send-message', msg);
            chat.emit('send-message', msg)
        });

        socket.on('read-conversation', function (msg) {
            console.log('conversation: ' + msg);
        });


    });
