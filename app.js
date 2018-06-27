let express = require('express');
let http = require('http');
let cors = require('cors');
let server = require('./server');
let config = require('./config');
let app = express();

app.use(cors());

app.use('/docs', express.static('docs'));
app.use('/public', express.static('public'));

app.listen(config.server.PORT , config.server.HOST, server.start(app));

