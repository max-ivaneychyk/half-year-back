let config = require('./config');
let express = require('express');
let app = express();

app.get('/', function (req, res) {
    res.send('hello world')
});


app.listen(config.server.PORT, function () {
    console.log('Ready');
});
