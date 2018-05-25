let config = require('./config');
let express = require('express');
let server = require('./server');
let cors = require('cors');
let app = express();

app.use(cors());

app.listen(config.server.PORT, server.start.bind(server, app));
