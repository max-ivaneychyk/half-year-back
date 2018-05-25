let config = require('./config');
let express = require('express');
let server = require('./server');
let app = express();

app.listen(config.server.PORT, server.start.bind(server, app));
