let config = require('./config');
let express = require('express');
let server = require('./server');
let app = express();

app.get('/', function (req, res) {
    res.send('hello world')
});


app.listen(config.server.PORT, server.start);
